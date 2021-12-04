console.log("view.js");

window.onload = async () => {
    test_plot_data();

    const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
    });

    await pyodide.loadPackage("numpy");
    await pyodide.loadPackage("scikit-learn");

    console.log("pyodide is ready");
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