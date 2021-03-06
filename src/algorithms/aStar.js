
export const astar=(grid,startNode,finishNode)=>{
	const visitedNodesInOrder=[];
	startNode.distance=0;
	startNode.fDist=2*Math.abs(startNode.row-finishNode.row)+2*Math.abs(startNode.col-finishNode.col);
	const unvisitedNodes=getAllNodes(grid);
	while(!!unvisitedNodes.length){
		sortNodesByDistance(unvisitedNodes);
		const closestNode=unvisitedNodes.shift();
		if(closestNode.isWall) continue;
		if(closestNode.fDist===Infinity) return visitedNodesInOrder;
		closestNode.isVisited=true;
		visitedNodesInOrder.push(closestNode);
		if(closestNode===finishNode) return visitedNodesInOrder;
		updateUnvisitedNeighbors(closestNode,grid,finishNode);
	}
}

const sortNodesByDistance=(unvisitedNodes)=>{
	unvisitedNodes.sort((nodeA,nodeB)=>nodeA.fDist-nodeB.fDist);
}

const updateUnvisitedNeighbors=(node,grid,finishNode)=>{
	const unvisitedNeighbors=getUnvisitedNeighbors(node,grid);
	for(const neighbor of unvisitedNeighbors){
		neighbor.distance=node.distance+1;
		neighbor.previousNode=node;
		const hDist=Math.abs(neighbor.row-finishNode.row)+Math.abs(neighbor.col-finishNode.col);
		neighbor.fDist=hDist+neighbor.distance;
	}
}

const getUnvisitedNeighbors=(node,grid)=>{
	const neighbors=[];
	const {col,row}=node;
	if(row>0) neighbors.push(grid[row-1][col]);
	if(row<grid.length-1) neighbors.push(grid[row+1][col]);
	if(col>0) neighbors.push(grid[row][col-1]);
	if(col<grid[0].length-1) neighbors.push(grid[row][col+1]);
	return neighbors.filter(neighbor=>!neighbor.isVisited && !neighbor.isWall);
}

const getAllNodes=(grid)=>{
	const allnodes=[];
	for(const row of grid){
		for(const node of row){
			allnodes.push(node);
		}
	}
	return allnodes;
}

export const astarShortestPath=(finishNode)=>{
	const nodesInShortestPath=[];
	let currentNode=finishNode;
	while(currentNode!==null){
		nodesInShortestPath.unshift(currentNode);
		currentNode=currentNode.previousNode;
	}
	return nodesInShortestPath;
}