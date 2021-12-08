console.log("view.js");

window.onload = async () => {
    // test_plot_data();

    const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
    });

    await pyodide.loadPackage("numpy");
    await pyodide.loadPackage("scikit-learn");

    console.log("pyodide is ready");

    const loader = document.getElementById("loader_wrap");
    console.log(loader);
    loader.remove();

    pyodide.runPython(`
    import numpy as np
    from sklearn.datasets import load_breast_cancer
    from sklearn.manifold import TSNE

    all_data = load_breast_cancer()

    tsne = TSNE(n_components=2,learning_rate=50)
    x_embed = tsne.fit_transform(all_data.data)

    xx_neg = x_embed[all_data.target == 0].T
    xx_pos = x_embed[all_data.target == 1].T
    `);

    const xx_neg = pyodide.globals.get("xx_neg").toJs();
    const xx_pos = pyodide.globals.get("xx_pos").toJs();

    console.log(xx_neg);

    Plotly.newPlot("graph_area", [{
        name: "Negative",
        x: xx_neg[0],
        y: xx_neg[1],
        mode: "markers",
        type: "scatter",
        marker: {
            color: "blue",
        }
    },
    {
        name: "Positive",
        x: xx_pos[0],
        y: xx_pos[1],
        mode: "markers",
        type: "scatter",
        marker: {
            color: "red",
        }
    }]);

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