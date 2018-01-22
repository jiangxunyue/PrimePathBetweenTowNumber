
function findPrimePath(origin, result) {

	// 存储所有的路径
	let alreadyExistNumberMap = new Map();

	// 存储每一步的路径
	let middleResult = new Map();

	// 跟节点
	let rootNode = new Node(origin);

	alreadyExistNumberMap.set(origin, rootNode);

	middleResult.set(origin, rootNode);

	let resultNode = null;

	let i = 0;
	while(middleResult.size > 0 && !middleResult.has(result)) {

		let tmpMiddleResult = new Map();
		for (let [number, node] of middleResult) {
			let neighborNumbers = generateNeighborPrimeNumbers(number, result);
			for (let oneNum of neighborNumbers) {
				if (alreadyExistNumberMap.has(oneNum)) continue;
				let subNode = new Node(oneNum);
				node.setSubNode(subNode);
				alreadyExistNumberMap.set(oneNum, subNode);
				tmpMiddleResult.set(oneNum, subNode);
			}
		}
		middleResult = tmpMiddleResult;
	}
	if (middleResult.size > 0) {
		let node = middleResult.get(result);
		// console.log(node)

		let path = [node.value];
		while (node.father) {
			path.unshift(node.father.value);
			node = node.father;
		}
		console.log(`path is ${path.join('---->')}`);
	}else {
		console.log(`can\'t find a path from ${origin} to ${result}`);
	}
	
}

class Node {
	
	constructor(value) {
		this.value = value;
		this.subNodes = new Set();
		this.father = null;
	}
	setSubNode(node) {
		this.subNodes.add(node);
		node.father = this;
	}
}

function generateNeighborPrimeNumbers(origin, result) {
	let resultArr = [];
	origin = origin.toString();
	for (let i = 0; i < origin.length; i++) {
		let ch = origin.charAt(i);
		let num = Number(ch);
		for (let j = 0; j < 10; j++) {
			if (num === j) continue;
			let newNum = Number(origin.substring(0, i) + j + origin.substring(i + 1));
			if (isPrime(newNum) || newNum === result) {
				resultArr.push(newNum);
			}
		}

	}
	return resultArr;
}


function isPrime(number) {
	let sqrt = Math.sqrt(number);
	for (let i = 2; i <= sqrt; i++) {
		if (number % i === 0) return false;
	}
	return true;
}

findPrimePath(66663, 34435)
