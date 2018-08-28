#%%
# Namedtuple can be used as an immutable object
#
import collections
Grade = collections.namedtuple("Grade", ("score", "weight"))

grades = [
    Grade(80, 0.1), Grade(70, 0.2), Grade(60, 0.3), Grade(50, 0.4)
]

def average(grades):
    total, total_w = 0 ,0
    for g in grades:
        total += g.score * g.weight
        total_w += g.weight
    return total / total_w

average(grades)

#%%
#
# Callbable instance

class Counter(object):
    def __init__(self):
        self._n = 0

    def __call__(self):
        self._n += 1
        return self._n

c = Counter()
print(c())
print(c())
print(c._n)

#%%
#
# Class methods
class Person(object):
    @classmethod
    def hi(cls):
        print("Hi,  I'm class")

    def __init__(self, name):
        self._name = name

    def hello(self):
        """
        You CANNOT define `hi` instance method when it's already taken for classmethod
        """
        print("Hi, I'm {}".format(self._name))


Person.hi()
Person("Alice").hello()
