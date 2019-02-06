# %%
import pandas as pd
from nltk.tokenize import RegexpTokenizer

tokenizer = RegexpTokenizer(r'\w+')

words = []
with open("tom.txt", "r") as f:
    for ll in f:
        l = ll.rstrip("\n")
        for w in tokenizer.tokenize(l):
            words.append(w)
    f.close()

# %%
s = pd.Series(words)
s.value_counts(sort=True, ascending=False)
