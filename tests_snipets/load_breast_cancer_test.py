from sklearn.datasets import load_breast_cancer

all_data = load_breast_cancer()

print(type(all_data))

print(all_data.keys())
print(all_data.feature_names)

x1 = all_data.data[:, 0]
x2 = all_data.data[:, 1]

print(all_data.data.shape)

# print(type(x1))
# print(x1, x2)
