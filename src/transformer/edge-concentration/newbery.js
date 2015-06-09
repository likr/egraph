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

const setEquals = (a, b) => {
  return a.size === b.size && setminus(a, b).size === 0;
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
      if (setEquals(i.target, c.target)) {
        c.source = union(i.source, c.source);
        stop = true;
        break;
      }
    }

    for (const c of concentrations) {
      const iDash = setminus(i.target, c.target),
            cDash = setminus(c.target, i.target);
      if (iDash.size > 0 && cDash.size === 0) {
        concentrations.push({
          source: i.source,
          target: iDash
        });
        c.source = union(c.source, i.source);
        stop = true;
        break;
      }
    }

    if (!stop) {
      concentrations.push(i);
    }
  }

  const merged = new Map(concentrations.map((_, i) => [i, false]));
  for (let i = 0; i < concentrations.length; ++i) {
    const c1 = concentrations[i];
    if (merged.get(i)) {
      continue;
    }
    for (let j = i + 1; j < concentrations.length; ++j) {
      const c2 = concentrations[j];
      if (setEquals(c1.target, c2.target)) {
        c1.source = union(c1.source, c2.source);
        merged.set(j, true);
      }
    }
  }

  for (const c of concentrations) {
    c.source = Array.from(c.source);
    c.target = Array.from(c.target);
  }

  return concentrations
    .filter((c, i) => !merged.get(i) && c.target.length > 1);
};

export default newbery;
