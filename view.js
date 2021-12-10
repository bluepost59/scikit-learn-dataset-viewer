console.log("view.js");

window.onload = async () => {
    const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
    });

    await pyodide.loadPackage("numpy");
    await pyodide.loadPackage("scikit-learn");

    console.log("pyodide is ready");

    // スライダー0の設定
    const index_slider_0 = document.getElementById("index0");
    const index_res_0 = document.getElementById("slider_res_0");
    index_slider_0.disabled = false;

    index_slider_0.oninput = () => {
        index_res_0.innerText = index_slider_0.value;
    };

    //スライダー1の設定
    const index_slider_1 = document.getElementById("index1");
    const index_res_1 = document.getElementById("slider_res_1");
    index_slider_1.disabled = false;

    index_slider_1.oninput = () => {
        index_res_1.innerText = index_slider_1.value;
    };

    // ローダーの削除
    const loader = document.getElementById("loader_wrap");
    console.log(loader);
    loader.remove();

    // python実行
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