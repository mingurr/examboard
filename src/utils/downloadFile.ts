export const downloadFile = (fileName: string) => {
  if (!fileName) return;

  const blob = new Blob([`${fileName} ダウンロード`], {
    type: "text/plain",
  });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  window.URL.revokeObjectURL(url);
};
