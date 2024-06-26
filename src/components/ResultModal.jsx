import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;

  if (userLost) {
    remainingTime = Math.abs(remainingTime);
  }
  console.log(remainingTime);
  console.log(userLost);

  let formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  let score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  if (score > 100) {
    score = Math.round((1 + remainingTime / (targetTime * 1000)) * 100);
  }

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>Too slow! Your score: {score}</h2>}
      {!userLost && <h2>Too fast! Your score: {score}</h2>}}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      {userLost && (
        <p>
          You stopped the timer{" "}
          <strong>{formattedRemainingTime} seconds late</strong>
        </p>
      )}
      {!userLost && (
        <p>
          You stopped the timer with{" "}
          <strong>{formattedRemainingTime} seconds remaining</strong>
        </p>
      )}
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
