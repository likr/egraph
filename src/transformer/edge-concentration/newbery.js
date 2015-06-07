const intersection = (g, u1, u2, h2) => {
  return {
    source: new Set([u1, u2]),
    target: new Set(h2.filter((v) => g.edge(u1, v) && g.edge(u2, v)))
  };
};

const setminus = (a, b) => {
  return new Set(Array.from(a.values()).filter((x) => !b.has(x)));
};

const union = (a, b) => {
  const s = new Set(a);
  for (const x of b) {
    s.add(x);
  }
  return s;
};

const newbery = (g, h1, h2, k, dummy) => {
  const intersections = [];
  for (let i = 0; i < h1.length; ++i) {
    const u1 = h1[i];
    for (let j = i + 1; j < h1.length; ++j) {
      const u2 = h1[j];
      intersections.push(intersection(g, u1, u2, h2));
    }
  }
  intersections.sort((i1, i2) => i1.target.size - i2.target.size);

  const concentrations = [];
  for (const i of intersections) {
    let stop = false;

    if (i.target.size < 2) {
      continue;
    }

    for (const c of concentrations) {
      if (i.target === c.target) {
        c.source = union(i.target, c.source);
        stop = true;
        break;
      }
    }

    for (const c of concentrations) {
      const iDash = setminus(i.target, c.target);
      if (iDash.size > 0) {
        concentrations.push({
          source: i.source,
          target: iDash
        });
        c.source = union(c.source, i.source);
        stop = true;
        break;
      }
      const cDash = setminus(c.target, i.target);
      if (cDash.size > 0) {
        concentrations.push(i);
        concentrations.push({
          source: union(i.source, c.source),
          target: cDash
        });
        stop = true;
        break;
      }
    }

    if (!stop) {
      concentrations.push(i);
    }
  }

  for (const c of concentrations) {
    c.source = Array.from(c.source);
    c.target = Array.from(c.target);
  }

  return concentrations;
};

export default newbery;
