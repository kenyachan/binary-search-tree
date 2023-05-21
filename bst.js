const testData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = newTree(testData);

tree.prettyPrint();
tree.insert(4);
tree.prettyPrint();

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

	function remove(data, root = this.root) {
		if (root === null) return root;

		// Traverse the tree
		if (data < root.data) {
			root.left = remove(data, root.left);
		} else if (data > root.data) {
			root.right = remove(data, root.right);
		} else {
			// data match found
			if (root.left === null)
				return root.right;

			if (root.right === null)
				return root.left;

			// Replace with smallest value
			root.data = inOrderSuccessor(root.right);;
			root.right = remove(root.data, root.right);
		}

		return root;
	}

	function inOrderSuccessor(node) {
		if (node.left === null)
			return node.data;

		return inOrderSuccessor(node.left);
	}

	function find(value, root = this.root) {
		if (root === null) return null;

		if (value < root.data)
			return find(value, root.left);
			
		if (value > root.data)
			return find(value, root.right);
		
		return root;
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

	function preOrder(callback, root = this.root) {
		let discoveredNodes = [root.data];

		if (callback !== undefined)
			callback(root.data);

		if (root.left !== null)
			discoveredNodes = discoveredNodes.concat(preOrder(callback, root.left));

		if (root.right !== null)
			discoveredNodes = discoveredNodes.concat(preOrder(callback, root.right));

		return discoveredNodes;
	}

	function inOrder(callback, root = this.root) {
		let discoveredNodes = [];

		if (root.left !== null)
			discoveredNodes = discoveredNodes.concat(inOrder(callback, root.left));

		discoveredNodes.push(root.data);
		
		if (callback !== undefined)
			callback(root.data);

		if (root.right !== null)
			discoveredNodes = discoveredNodes.concat(inOrder(callback, root.right));

		return discoveredNodes;
	}

	function postOrder(callback, root = this.root) {
		let discoveredNodes = [];

		if (root.left !== null)
			discoveredNodes = discoveredNodes.concat(postOrder(callback, root.left));

		if (root.right !== null)
			discoveredNodes = discoveredNodes.concat(postOrder(callback, root.right));

		discoveredNodes.push(root.data);

		if(callback !== undefined)
			callback(root.data);

		return discoveredNodes;
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

	function depth(value, root = this.root) {
		if (root.data === value) return 1;

		return value < root.data ?
			depth(value, root.left) + 1 :
			depth(value, root.right) + 1;
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


