
function Vid() {
  return (
    <div className="border-4 mt-20 ">
      <iframe
        className="w-full max-w-[320px] mx-auto h-[360px] md:h-[540px] my-2 border border-slate-300 
        border-solid rounded-sm"
        title="Video for sign in"
        src={
          "https://drive.google.com/file/d/1Z2GYZkLJ2nBT_ECSuS3zwmYXkGvtmAbV/preview"
        }
        sandbox="allow-same-origin allow-scripts"
        allowFullScreen
      />
    </div>
  );
}

export default Vid;
