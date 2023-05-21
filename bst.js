const testData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const testData2 = [4, 5, 8 ,10, 15, 20 ,25];

function newTree(array) {
	let sortedArray = [...array].sort((a, b) => a - b);
	let uniqueArray = [...new Set(sortedArray)];	// remove duplicates
	let root = buildTree(uniqueArray);

	function buildTree(array) {
		if (array.length === 0) return null;

		let midIndex = array.length % 2 === 0 ?
			(array.length / 2) - 1:
			Math.floor(array.length / 2);

		let leftArray = array.splice(0, midIndex);
		let rightArray = array.splice(1, array.length - 1);
		let node = newNode(array[0]);

		node.left = buildTree(leftArray) || null;
		node.right = buildTree(rightArray) || null;

		return node;
	}

	function _insert(data, root = this.root) {
		if (root === null)
			return newNode(data);

		if (data < root.data)
			root.left = _insert(data, root.left);

		if (data > root.data)
			root.right = _insert(data, root.right);

		return root;
	}

	function insert(data) {
		return _insert(data, this.root);
	}

	function _remove(data, root = this.root) {
		if (root === null) return root;

		// Traverse the tree
		if (data < root.data) {
			root.left = _remove(data, root.left);
		} else if (data > root.data) {
			root.right = _remove(data, root.right);
		} else {
			// data match found
			if (root.left === null)
				return root.right;

			if (root.right === null)
				return root.left;

			// Replace with smallest value
			root.data = inOrderSuccessor(root.right);;
			root.right = _remove(root.data, root.right);
		}

		return root;
	}

	function remove(data) {
		return _remove(data, this.root);
	}

	function inOrderSuccessor(node) {
		if (node.left === null)
			return node.data;

		return inOrderSuccessor(node.left);
	}

	function _find(value, root = this.root) {
		if (root === null) return null;

		if (value < root.data)
			return _find(value, root.left);

		if (value > root.data)
			return _find(value, root.right);
		
		return root;
	}

	function find(value) {
		return _find(value, this.root);
	}

	function levelOrder(callback) {
		let discoveredNodes = root !== null ? [root] : [];
		let visitedNodes = [];

		while (discoveredNodes.length > 0) {
			discoveredNode = discoveredNodes.shift();

			if (callback !== undefined)
				callback(discoveredNode.data);

			visitedNodes.push(discoveredNode.data);

			if (discoveredNode.left !== null)
				discoveredNodes.push(discoveredNode.left);

			if (discoveredNode.right !== null)
				discoveredNodes.push(discoveredNode.right);
		}

		if (callback === undefined)
			return visitedNodes;
	}

	function _preOrder(callback, root = this.root) {
		let discoveredNodes = [root.data];

		if (callback !== undefined)
			callback(root.data);

		if (root.left !== null)
			discoveredNodes = discoveredNodes.concat(_preOrder(callback, root.left));

		if (root.right !== null)
			discoveredNodes = discoveredNodes.concat(_preOrder(callback, root.right));

		return discoveredNodes;
	}

	function preOrder(callback) {
		return _preOrder(callback, this.root);
	}

	function _inOrder(callback, root = this.root) {
		let discoveredNodes = [];

		if (root.left !== null)
			discoveredNodes = discoveredNodes.concat(_inOrder(callback, root.left));

		discoveredNodes.push(root.data);
		
		if (callback !== undefined)
			callback(root.data);

		if (root.right !== null)
			discoveredNodes = discoveredNodes.concat(_inOrder(callback, root.right));

		return discoveredNodes;
	}

	function inOrder(callback) {
		return _inOrder(callback, this.root);
	}

	function _postOrder(callback, root = this.root) {
		let discoveredNodes = [];

		if (root.left !== null)
			discoveredNodes = discoveredNodes.concat(_postOrder(callback, root.left));

		if (root.right !== null)
			discoveredNodes = discoveredNodes.concat(_postOrder(callback, root.right));

		discoveredNodes.push(root.data);

		if(callback !== undefined)
			callback(root.data);

		return discoveredNodes;
	}

	function postOrder(callback) {
		return _postOrder(callback, this.root);
	}

	function prettyPrint(node = this.root, prefix = '', isLeft = true) {
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

	function treeHeight(root = this.root) {
		if (root === null) return 0;

		let leftHeight = treeHeight(root.left);
		let rightHeight = treeHeight(root.right);

		if (leftHeight >= rightHeight)
			return leftHeight + 1;
		else
			return rightHeight + 1;
	}

	function _depth(value, root = this.root) {
		if (root.data === value) return 1;

		return value < root.data ?
			_depth(value, root.left) + 1 :
			_depth(value, root.right) + 1;
	}

	function depth(value) {
		return _depth(value, this.root);
	}

	function checkBalance(root = this.root) {
		if (root === null)
			return true;

		let heightDifference = Math.abs(treeHeight(root.left) - treeHeight(root.right));

		if (heightDifference <= 1 && 
			checkBalance(root.left) === true &&
			checkBalance(root.right) === true)
			return true;
		return false;
	}

	function rebalance() {
		let inOrderArray = this.inOrder();

		this.root = buildTree(inOrderArray);
	}

	return {
		buildTree,
		insert,
		remove,
		find,
		levelOrder,
		preOrder,
		inOrder,
		postOrder,
		depth,
		rebalance,

		prettyPrint,

		get root() {
			return root;
		},

		set root(node) {
			root = node;
		},

		get height() {
			return treeHeight(this.root);
		},

		get isBalanced() {
			return checkBalance(this.root);
		}
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

		get isLeaf() {
			return (this.left === null && this.right === null) ?
				true : false;
		},

		set data(value) {
			data = value;
		},
		
		set left(node) {
			left = node;
		},

		set right(node) {
			right = node;
		},
	}
}

function newRandomArray() {
	let arr = [];

	let numberOfItems = Math.round(Math.random() * 100);
	
	for (let i = 0; i < numberOfItems; i++) {
		arr.push(Math.round(Math.random() * 100));
	}

	return arr;
}

function driverScript() {
	// 1. Create a binary search tree from an array of random numbers.
	let array = newRandomArray();

	let tree = newTree(array);
	console.log(`New tree created with array: ${array}`);
	tree.prettyPrint();
	
	// 2. Confirm the tree is balanced
	console.log(`Tree isBalanced = ${tree.isBalanced}`);

	// 3. Print out all elements in level, pre, post and in order
	printTree(tree);
	
	// 4. Unbalance the tree
	console.log('Unbalancing tree...');
	tree.insert(100);
	tree.insert(101);
	tree.insert(102);
	tree.insert(103);
	tree.insert(104);
	tree.prettyPrint();

	// 5. Confirm tree is unbalanced
	console.log(`Tree isBalanced = ${tree.isBalanced}`);

	// 6. Rebalance the tree
	console.log('Rebalancing tree...');
	tree.rebalance();
	tree.prettyPrint();

	// 7. Confirm tree is rebalanced
	console.log(`Tree isBalanced = ${tree.isBalanced}`);

	// 8. Print out all elements in level, pre, post and in order
	printTree(tree);
}

driverScript();

function printTree(tree) {
	let levelOrderArr = [];
	console.log('Level Order:');
	tree.levelOrder(x => levelOrderArr.push(x));
	console.log(levelOrderArr);

	let preOrderArr = [];
	console.log('PreOrder:');
	tree.preOrder(x => preOrderArr.push(x));
	console.log(preOrderArr);

	let postOrderArr = [];
	console.log('PostOrder:');
	tree.postOrder(x => postOrderArr.push(x));
	console.log(postOrderArr);

	let inOrderArr = [];
	console.log('InOrder:');
	tree.inOrder(x => inOrderArr.push(x));
	console.log(inOrderArr);
}
