const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
     return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const testData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = newTree(testData);

prettyPrint(tree.root);

function newTree(array) {
	let sortedArray = [...array].sort((a, b) => a - b);
	let uniqueArray = [...new Set(sortedArray)];	// remove duplicates
	let root = buildTree(uniqueArray);

	function buildTree(array) {
		if (array.length === 0) return null;
		if (array.length === 1) return newNode(array[0]);

		let midIndex = array.length % 2 === 0 ?
			(array.length / 2) - 1:
			Math.floor(array.length / 2);

		let leftArray = array.splice(0, midIndex);
		let rightArray = array.splice(1, array.length - 1);
		let node = newNode(array);

		node.left = buildTree(leftArray) || null;
		node.right = buildTree(rightArray) || null;

		return node;
	}

	return {
		buildTree,

		get root() {
			return root;
		},

		set root(node) {
			root = node;
		},
	}
}

function newNode(data) {
	let left = null;
	let right = null;

	return {
		get data() {
			return data;
		},

		get left() {
			return left;
		},

		get right() {
			return right;
		},
		
		set left(node) {
			left = node;
		},

		set right(node) {
			right = node;
		},
	}
}


