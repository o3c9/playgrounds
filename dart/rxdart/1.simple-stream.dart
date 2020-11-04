import 'dart:async';
import 'dart:io';

final controller = StreamController<String>();

void main() async {
  listen();

  controller.sink.add('Hello');
  for (int i = 0; i < 10; i++) {
    await Future.delayed(const Duration(seconds: 1), () {
      stdout.write('.');
    });
  }
  stdout.write('\n');

  controller.sink.add('Bye');
}

void listen() {
  controller.stream.listen((event) {
    print('Listener: Received: $event');
  });
}
