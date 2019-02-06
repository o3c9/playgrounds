import sys
from nltk.tokenize import sent_tokenize, word_tokenize


class ansicolor:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def read(text):
    with open(text, "r") as f:
        sentences = sent_tokenize(f.read())
        f.close()
        return sentences


def display(text, i, word, size):
    shown = []
    l = text[i]
    words = word_tokenize(l)
    target = words.index(word)
    if target < size:
        pl = text[i - 1]
        pwords = word_tokenize(pl)
        diff = size - target
        shown += pwords[len(pwords) - diff:]

    start = max([target - size, 0])
    shown += words[start:target]
    shown.append(ansicolor.OKGREEN)
    shown.append(words[target])
    shown.append(ansicolor.ENDC)
    shown += words[target + 1:target + size + 1]

    if target + size + 1 > len(words):
        nl = text[i + 1]
        nwords = word_tokenize(nl)
        diff = target + size - len(words) + 1
        shown += nwords[:diff]

    t = " ".join(shown)
    print(f"{i}: {t}")


def main(file, word, size):
    text = read(file)
    for i in range(len(text)):
        l = text[i]
        words = l.split(" ")
        if word in words:
            display(text, i, word, size)


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("usage: kwic.py text verb window-size")
        print("try: kwic.py tom showed 5")
    else:
        file = sys.argv[1]
        word = sys.argv[2]
        size = int(sys.argv[3])
        main(file, word, size)
