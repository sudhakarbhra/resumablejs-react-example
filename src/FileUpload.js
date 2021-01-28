import $ from "jquery";
import Resumable from "resumablejs";
import { useEffect, useState } from "react";
let r;
const FileUpload = ({ uploadUrl, token, event_id, title, description }) => {
  const [showNotSupported, setShowNotSupported] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [controls, setControls] = useState({
    showPause: true,
    showResume: false,
    showCancel: true,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    r = new Resumable({
      target: uploadUrl,
      chunkSize: 1 * 1024 * 1024,
      simultaneousUploads: 4,
      testChunks: false,
      throttleProgressCallbacks: 1,
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    // Resumable.js isn't supported, fall back on a different method
    if (!r.support) {
      setShowNotSupported(true);
    } else {
      setShowNotSupported(false);

      //   !ERROR : cannot use ref as event `e` is not supported
      if ($("#resumableDrop")) r.assignDrop($("#resumableDrop"));
      if ($(".resumable-browse")[0]) r.assignBrowse($(".resumable-browse")[0]);

      // Handle file add event
      r.on("fileAdded", (file) => {
        r.opts.query = () => {
          return { event_id, title, description };
        };
        // Show progress bar
        setUploading(true);
        setShowSuccess(false);
        setShowError(false);

        // Add the file to the list
        $(".resumable-list").append(
          `<li class="resumable-file-${file.uniqueIdentifier}"><span class="resumable-file-name"></span><span class="resumable-file-progress"></span>`
        );
        $(`.resumable-file-${file.uniqueIdentifier} .resumable-file-name`).html(
          `Uploading ${file.fileName}`
        );

        // Actually start the upload
        r.upload();
      });
      r.on("pause", function () {
        // Show resume, hide pause
        setControls({ showCancel: true, showResume: true, showPause: false });
      });
      r.on("complete", function () {
        setUploading(false);
        setShowSuccess(true);
        // Hide pause/resume when the upload has completed
        setControls({ showCancel: false, showResume: false, showPause: false });
      });
      r.on("fileSuccess", function (file, message) {
        // Reflect that the file upload has completed
        $(
          ".resumable-file-" +
            file.uniqueIdentifier +
            " .resumable-file-progress"
        ).html("File Uploaded Successfully");
      });
      r.on("fileError", function (file, message) {
        setShowError(true);
        // Reflect that the file upload has resulted in error
        $(
          ".resumable-file-" +
            file.uniqueIdentifier +
            " .resumable-file-progress"
        ).html("Something went wrong !! : " + message);
      });
      r.on("fileProgress", function (file) {
        // Handle progress for both the file and the overall upload
        $(
          ".resumable-file-" +
            file.uniqueIdentifier +
            " .resumable-file-progress"
        ).html(Math.floor(file.progress() * 100) + "%");
        $(".progress-bar").css({
          width: Math.floor(r.progress() * 100) + "%",
        });
      });
      r.on("cancel", function () {
        $(".resumable-file-progress").html("canceled");
      });
      r.on("uploadStart", function () {
        // Show pause, hide resume
        setControls({ showCancel: true, showResume: false, showPause: true });
      });
    }
  }, [description, event_id, title, token, uploadUrl]);
  const upload = () => {
    r.upload();
    return false;
  };

  const pause = () => {
    r.pause();
    return false;
  };
  const cancel = () => {
    r.cancel();
    setUploading(false);
    return false;
  };
  return (
    <section>
      {showNotSupported ? (
        <div className="resumable-error">
          Your browser, unfortunately, is not supported by Resumable.js. The
          library requires support te
          <a href="http://www.w3.org/TR/FileAPI/">the HTML5 File API</a> along
          with
          <a href="http://www.w3.org/TR/FileAPI/#normalization-of-params">
            file slicing
          </a>
          <b>hello</b>
        </div>
      ) : (
        <>
          <div id="resumableDrop" className="resumable-drop">
            Drop video files here to upload or
            <a className="resumable-browse">
              <u>select from your computer</u>
            </a>
          </div>
          {uploading && (
            <>
              <div className="resumable-progress">
                <table className="table">
                  <tbody>
                    <tr>
                      <td width="100%">
                        <div className="progress-container">
                          <div className="progress-bar"></div>
                        </div>
                      </td>
                      <td className="progress-text" nowrap="nowrap"></td>
                      <td className="progress-pause" nowrap="nowrap">
                        {controls.showResume && (
                          <button
                            onClick={upload}
                            className="progress-resume-link"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.5rem"
                              height="16"
                              fill="currentColor"
                              className="bi bi-play"
                              viewBox="0 0 16 16"
                            >
                              <path d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                            </svg>
                          </button>
                        )}

                        {controls.showPause && (
                          <button
                            onClick={pause}
                            className="progress-pause-link"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.5rem"
                              height="1.5rem"
                              fill="currentColor"
                              className="bi bi-pause "
                              viewBox="0 0 16 16"
                            >
                              <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                            </svg>
                          </button>
                        )}
                        {controls.showCancel && (
                          <button
                            onClick={cancel}
                            className="progress-cancel-link"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.5rem"
                              height="1.5rem"
                              fill="currentColor"
                              className="bi bi-x"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="resumable-list"></ul>
            </>
          )}
          {showSuccess && (
            <div className="upload-success">File Uploaded Successfully</div>
          )}
          {showError && (
            <div className="upload-error">
              Something went wrong, Please try again
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default FileUpload;
