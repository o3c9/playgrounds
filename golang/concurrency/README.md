# Concurrency in Go

By Katherine Cox-Buday

## Chapter 1. An Introduction to Concurrency

Concurrency = 並行 => マルチタスキングのこと（シングルコアで切り替えながら同時に進める）
Parallel = 並列 => 同時に複数のコア・スレッドを処理を行うこと

### 問題点

1. Race Conditions

読み書きの順序の整合性が取れていない場合に，２つの処理どうしで互いにデータを取り合ってしまう

1. Atomicity

これ以上分割できない単位の処理であること．Atomicityは，「どんなcontextにおいて」ということとセットで考える．
Requestの単位，Processの単位，OSの単位など，スコープによって，Atomicかどうかは変わる．
なぜこれが重要なのかというと，Atomicな操作はConcurrentな処理においても安全だから．
大抵の処理はatomicじゃないので，いろんなテクニックをつかって，Atomicにさせる必要がある

1. Memory Access Synchronization

同時に複数の処理から同一メモリにアクセスさせることがないように，Mutexを利用して，Lockをかけて，アクセスをsynchronizedにする．
しかし，同期アクセスを常に強要するのはパフォーマンスに難がある．

1. Deadlocks, Livelocks, and Starvation

- Deadlock: 複数の処理が互いに相手が終わるのを待ち続ける
- Livelock: 並行処理が走っているが，全体の進捗が全くない状態
  - 自転車がすれ違うときに，互いに同じ方向に避けあって，また反対に行ってを繰り返すような状態
  - Starvationの一種である
- Starvation: 並行処理に必要なリソースを確保できなくて，タスクを完了できないこと
  - GreedyなプロセスがLockを持ち続けすぎていて，他の処理の邪魔をしているような場合に起こる

### 並列実行の安全性を見極める

これがもっとも難しい．ある関数のシグネチャだけをみて，

```
// CalculatePi calculates digits of Pi between the begin and end place.
func CalculatePi(begin, end int64, pi *Pi)
```

- で，この関数をどうcallすればいいの？
- 利用する側が，複数の並列実行処理を書くべきなの？
- 利用する側が渡した変数に複数のインスタンスからアクセスがあるみたいだけど，同期処理は自分でやるべき？それともこの関数内でやってくれるの？

これらの疑問について，コメントで明確にしておくのが大切

- 並列実行に責任を持つのは誰か？
- 解こうとしている問題でどのように並列処理が利用されているのか？
- データの同期に責任を持つのは誰か？

Goは，言語デザインからこういった問題に対して適切にアプローチしている．一番ややこしいところはgoのruntimeが担ってくれているので，自分たちは
goが提供するやり方に従えば良い．

たとえばHTTPサーバーをつくるときに，ある言語では，コネクションを受け取るためのThread Poolを事前につくっておき，そのスレッドをLoopさせて，リクエストを処理させるような仕組みになっている．
しかし，goでは，関数の前に`go`キーワードを書くだけで，あとは勝手にやってくれる

## Chapter 2. Modeling Your Code: Communicating Sequential Processes

CSP - Goの並列処理の実装のもととなった考え方

Go Routineは，OSスレッドへとGoランタイムによってマップされるが，そのスケジューリングはすべてランタイムで吸収してくれる．

One of Go's motto: Share memory by communicating, don't communicate by sharing memory

Aim for simplicity, use channels when possible, and treat goroutines like a free resource.

### Chapter 3

#### goroutines

端的に言えば，並列実行可能な関数のこと. Goランタイム上で実現されており，ノンプリエンプティブである - つまりノンプリエンプティブなスケジューリング方式とは、1つのタスクが実行し終えたら次の順番のタスクというように順次実行していく様子を表しています。

```go
go func() {
  fmt.Println("hello")
}()  // created from anonymous function
```

goroutinesのサスペンドや再開などの処理は，Goのランタイムで自動的に制御されている．

M:Nスケジューラー = M個のGreen Threadを，N個のOS Threadにマッピングする．
Go Routineは，Green Thread上で実行される．

Goでは，Fork-joinモデルが採用されている．
プログラム実行のある時点で，childブランチを発生させ，ある時点でjoin backさせる．

```go
var wg sync.WaitGroup
hello := func() {
  defer wg.Done()
  fmt.Println("Hello!")
}
wg.Add(1)
go hello()
wg.Wait()
```

`wg.Wait()`で，main関数の実行を，hello coroutine 終了まで停止させる

#### goroutineとスコープ

```go
var wg sync.WaitGroup
for _, m := range []string{"Hello", "Good day", "Greeting"} {
  wg.Add(1)
  go func() {
    defer wg.Done()
    fmt.Println(m)
  }()
}
wg.Wait()
```

これの結果は，"Greeting" x 3になる．これは，coroutine実行時には，m変数には，"Greeting"がはいっているからだ．
ただしくは，mのコピーをクロージャに渡してやる必要がある

```go
var wg sync.WaitGroup
for _, m := range []string{"Hello", "Good day", "Greeting"} {
  wg.Add(1)
  go func(message string) {
    defer wg.Done()
    fmt.Println(message)
  }(m)
}
wg.Wait()
```

Goroutineが作成されると，ランタイムからは数キロバイトほどのメモリーが与えられる．このため，通常は何千個というGoroutineを作っても安全である．また，メモリーが足りない場合には，ランタイムから自動的に追加される．


### sync パッケージ

syncには，低レベルのメモリアクセスを同期するために必要な道具がはいっている．

#### WaitGroup

結果を受け取らない，または戻り値以外の方法で結果を受け取れるような，並列タスクの完了を待つために利用される．
（そうでない場合は，channel + select を利用する）

`Add`を，goroutineの外側で呼ぶ必要があることに注意 :notice:

```go
var wg sync.WaitGroup
wg.Add(1)
go func(message string) {
  defer wg.Done()
  fmt.Println(message)
}(m)
wg.Wait()
```

### Mutex, RWMutex

Mutexは，共有リソースに排他アクセスするのに用いられる．

```go
func() {
  lock.Lock()
  defer lock.Unlock()
  // ready or modify shared resources
}
```

RWMutexは，read用なのかwrite用なのかを宣言でき，いくらread lockがかかっていても，write lockがなければ，lockを得ることができる

lockはパフォーマンスに影響が出るため，RWMutexを使えるならこちらを使ったほうがよい

### Cond

Condとは，複数のgoroutinesの待ち合わせ場所で，なにかしらのイベントが起こるのを確認するまで待つ必要があり，その確認は繰り返し行う必要がある場合に，シンプルに書けるためのツール

https://lestrrat.medium.com/sync-cond-%E3%82%B3%E3%83%B3%E3%83%87%E3%82%A3%E3%82%B7%E3%83%A7%E3%83%B3%E5%A4%89%E6%95%B0%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AE%E8%A7%A3%E8%AA%AC-dd2050cdfab7

### Once

複数のgoroutineから呼ばれる可能性はあるが，必ず一回しか呼ばれないことを保証したいときに，`once.Do`で関数をwrapする

### Pool

データベースコネクションのような生成コストが高いオブジェクトをPoolしておくためのパターン．

### Channels

channelに値を渡すと，プログラムの別の箇所で，そのchannelから，値を読み出すことができる


