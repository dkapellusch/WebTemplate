export function createWorker(code: string): Worker {
  return new Worker(createUrlObject(createBlob(code)));
}

function createBlob(code: string): Blob {
  return new Blob(
    ["self.onmessage = ()=>{", "self.postMessage((", code, ")());}"],
    { type: "text/javascript" }
  );
}

function createUrlObject(blob: Blob): string {
  return window.URL.createObjectURL(blob);
}
