import 'dart:async';
import 'package:rxdart/rxdart.dart';

final subject = ReplaySubject<String>();

void main() async {
  subject.listen((data) {
    print('検知1------');
    print(data);
  });

  // 発行
  subject.add("Item1");
  subject.add("Item1");
  subject.add("Item2");
  subject.add("Item3");

  await Future.delayed(Duration(seconds: 5)); // このコードは検証用 5秒待つ
  print('【ここまで発行1回目】');
  // 購読
  subject.listen((data) {
    print('検知2------');
    print(data);
  });
  subject.add("Item4");
  print('【ここまで発行2回目】');
}
