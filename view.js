console.log("view.js");

window.onload = async () => {
    // test_plot_data();

    const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
    });

    await pyodide.loadPackage("numpy");
    await pyodide.loadPackage("scikit-learn");

    console.log("pyodide is ready");

    pyodide.runPython(`
    import numpy as np
    from sklearn.datasets import load_breast_cancer
    from sklearn.manifold import TSNE

    all_data = load_breast_cancer()

    tsne = TSNE(n_components=2,learning_rate=50)
    x_embed=tsne.fit_transform(all_data.data)

    x0 = x_embed[:,0]
    x1 = x_embed[:,1]
    `);

    // pyodide.runPython(`
    // import numpy as np
    // xx = np.random.rand(100,100)

    // x0 = xx[:,0]
    // x1 = xx[:,1]
    // `);

    const x0 = pyodide.globals.get("x0").toJs();
    const x1 = pyodide.globals.get("x1").toJs();

    Plotly.newPlot("graph_area", [{
        x: x0,
        y: x1,
        mode: "markers",
        type: "scatter",
    }])

}

// まずばbreast_cancer_dataset
async function test_plot_data() {
    const xx = [1, 2, 3, 4, 5];
    const yy = [2, 10, 15, 10, 21];

    Plotly.newPlot("graph_area", [{
        x: xx,
        y: yy,
        mode: "markers",
        type: "scatter",
    }]);
}