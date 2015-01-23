var Set = function (){
	this.elements = {};
};

Set.prototype.add = function(e){
	this.elements[e] = true;
};

Set.prototype.has = function(e){
	return this.elements.hasOwnProperty(e);
};

Set.prototype.remove = function(e){
	delete this.elements[e];
};

var Vertex = function(value)
{
	this.value = value;
}

var Edge = function (x, y){
	this.x = x;
	this.y = y;
}

Edge.prototype.print = function() {
	print(this.x + " -> " + this.y);
};

var Path = function () {
	this.vertices = [];
	this.isCycle = false;
};

Path.prototype.addVertex = function(v) {
	if (!this.isCycle){
		if ((this.vertices.length > 0) && (v == this.vertices[0])){
			this.isCycle = true;
		}
		this.vertices.push(v);
	}
};

Path.prototype.length = function() {
	return this.vertices.length;
};

var Graph = function (){
	this.vertices = new Object();
	this.visited = {};
	this.colors = {};
};

Graph.prototype.addVertex = function(x) {
	this.vertices[x] = [];
};

Graph.prototype.addEdge = function(x, y) {
	this.vertices[x].push(y);
	this.vertices[y].push(x);
};

Graph.prototype.degree = function() {
	var edges = 0;
	for (vertex in this.vertices){
		edges = edges + this.vertices[vertex].length;
	}
	return edges;
};

Graph.prototype.dfs = function (f) {
	this.visited = {};
	var graphVertices = Object.keys(this.vertices);
	//Check empty graph
	this.doDfs(graphVertices[0], f);
}

Graph.prototype.doDfs = function (v, f) {
	this.visited[v] = true;
	f(v);
	for (var i = 0; i < this.vertices[v].length; i++){
		if (!this.visited.hasOwnProperty(this.vertices[v][i])) {
			this.doDfs(this.vertices[v][i], f);
		}
	}
}

Graph.prototype.isBipartite = function(){
	this.colors = {};
	var graphVertices = Object.keys(this.vertices);
	return this.checkBipartite(parseInt(graphVertices[0]), true);
}

Graph.prototype.checkBipartite = function(v, c){
	var path = new Path();
	this.colors[v] = c;
	for (var i = 0; i < this.vertices[v].length; i++){
		if (!this.colors.hasOwnProperty(this.vertices[v][i])) {
			var foundPath = this.checkBipartite(this.vertices[v][i], !c);
			if (foundPath.length() > 0){
				foundPath.addVertex(v);
				return foundPath;
			}
		}
		else{
			if (this.colors[this.vertices[v][i]] == c){
				path.addVertex(this.vertices[v][i]);
				path.addVertex(v);
				return path;
			}
		}
	}
	return path;
}

/*Graph.prototype.print = function() {
	for (var i = 0; i < this.edges.length; i++){
		this.vertices[i].print();
	}
};*/

/*var k4 = new Graph();
for (var i = 0; i < 4; i++){
	k4.addVertex(i);
	for (var j = 0; j < 4; j++){
		if (i != j){
			k4.addEdge(i, j);
		}
	}
}

var k5 = new Graph();
for (var i = 0; i < 5; i++){
	k5.addVertex(i);
	for (var j = 0; j < 5; j++){
		if (i != j){
			k5.addEdge(i, j);
		}
	}
}*/

var cycle3 = new Graph();
cycle3.addVertex(1);
cycle3.addVertex(2);
cycle3.addVertex(3);
cycle3.addEdge(1, 2);
cycle3.addEdge(2, 3);
cycle3.addEdge(3, 1);
console.log(cycle3.isBipartite());

var cycle4 = new Graph();
cycle4.addVertex(1);
cycle4.addVertex(2);
cycle4.addVertex(3);
cycle4.addVertex(4);
cycle4.addEdge(1, 2);
cycle4.addEdge(2, 3);
cycle4.addEdge(3, 4);
cycle4.addEdge(4, 1);
console.log(cycle4.isBipartite());

var union = new Graph();
union.addVertex(1);
union.addVertex(2);
union.addVertex(3);
union.addVertex(4);
union.addVertex(5);
union.addVertex(6);
union.addEdge(1, 2);
union.addEdge(2, 3);
union.addEdge(3, 4);
union.addEdge(4, 1);
union.addEdge(1, 5);
union.addEdge(1, 6);
union.addEdge(5, 6);
console.log(union.isBipartite());

var pathBeforeCycle = new Graph();
pathBeforeCycle.addVertex(1);
pathBeforeCycle.addVertex(2);
pathBeforeCycle.addVertex(3);
pathBeforeCycle.addVertex(4);
pathBeforeCycle.addVertex(5);
pathBeforeCycle.addEdge(1, 2);
pathBeforeCycle.addEdge(2, 3);
pathBeforeCycle.addEdge(3, 4);
pathBeforeCycle.addEdge(4, 5);
pathBeforeCycle.addEdge(3, 5);
console.log(pathBeforeCycle.isBipartite());

/*console.log(k5);
console.log(k5.degree());
k5.dfs(
	function (x)
	{
		console.log(x);
	}
);*/

