#%%
#
# Item 17. Be Defensive When Iterating Over Arguments

class ReadFile(object):
    """
    Example of Iteratable object
    """
    def __init__(self, path):
        self.path = path

    def __iter__(self):
        with open(self.path) as f:
            for line in f:
                yield line.strip()

for l in ReadFile("sample.txt"):
    print(l)

# However, it can be achieved with open

for l in open("sample.txt"):
    print(l.strip())

#%%
#
# Item 21: Enforce Clarity with Keyword-Only Arguments
#
# `*` indicates the end of positional arguments and the beginning of keyword-only arguments.
def enforce_keyword_only(*, a=0, b=1):
    print("a={}, b={}".format(a, b))
    pass

enforce_keyword_only(a=1, b=3)
