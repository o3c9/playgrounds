import 'dart:async';
import 'dart:io';

final controller = StreamController<String>.broadcast();

void main() async {
  listener1();
  listener2();

  controller.sink.add('Hello');
  for (int i = 0; i < 10; i++) {
    await Future.delayed(const Duration(seconds: 1), () {
      stdout.write('.');
    });
  }
  stdout.write('\n');

  controller.sink.add('Bye');
}

void listener1() {
  controller.stream.listen((event) {
    print('Listener1: Received: $event');
  });
}

void listener2() {
  controller.stream.listen((event) {
    print('Listener2: Received: $event');
  });
}
