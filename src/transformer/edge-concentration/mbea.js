import Graph from '../../graph'

const biclique_find = (graph, L, R, P, Q, cliques) => {
  while(P.size != 0){
    let x = Array.from(P)[0];
    P.delete(x);
    let _R = new Set([...R, x]);
    let _L = new Set(graph.inVertices(x).filter((u) => L.has(u)));
    let complement_L = new Set(Array.from(L).filter((u) => !_L.has(u)));
    _L.forEach((l) => {complement_L.delete(l)});
    let C = new Set([x]);
    let _P = new Set();
    let _Q = new Set();
    let is_maximal = true;
    for(let v of Q){
      let N = new Set(graph.inVertices(v).filter((u) => _L.has(u) ));
      if(N.size == _L.size){
        is_maximal = false;
        break;
      }else if(N.size > 0){
        _Q = _Q.add(v);
      }
    }
    if(is_maximal){
      for(let v of P){
        if(v != x){
          let N = new Set(graph.inVertices(v).filter((u) => _L.has(u) ));
          if(N.size == _L.size){
            _R.add(v);
            let S = new Set(graph.inVertices(v).filter((u) => complement_L.has(u) ));
            if(S.size == 0) C.add(v);
          }else if(N.size > 0){
            _P.add(v);
          }
        }
      }
      if(_P.size != 0){
        biclique_find(graph, _L, _R, _P, _Q, cliques);
      }else{
        if(_L.size > 1 && _R.size > 1) {
          cliques.push({
            source: Array.from(_L),
            target: Array.from(_R)
          });
        }
      }
    }
    Q = new Set([...Q, ...C]);
    P = new Set(Array.from(P).filter((v) => !C.has(v)));
  }
};

const mbea = (graph, h1, h2) => {
  const subgraph = new Graph();
  for (const u of h1) {
    subgraph.addVertex(u, graph.vertex(u));
  }
  for (const u of h2) {
    subgraph.addVertex(u, graph.vertex(u));
  }
  for (const u of h1) {
    for (const v of h2) {
      if (graph.edge(u, v)) {
        subgraph.addEdge(u, v, graph.edge(u, v));
      }
    }
  }

  const U_array = subgraph.vertices().filter((u) => subgraph.outDegree(u) );
  const V_array = subgraph.vertices().filter((u) => subgraph.inDegree(u) );
  const L_array = U_array;
  const R_array = [];
  const P_array = V_array;
  const Q_array = [];
  let cliques = [];
  biclique_find(subgraph, new Set(L_array), new Set(R_array), new Set(P_array), new Set(Q_array), cliques);
  return cliques;
};

export default mbea
