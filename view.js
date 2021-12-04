console.log("view.js");

window.onload = async () => {

    const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
    });

    await pyodide.loadPackage("numpy");
    await pyodide.loadPackage("scikit-learn");

    console.log("pyodide is ready");
}