"use client";

import SaveButton from "./SaveButton";

export default function DeleteProductButton({ productName }) {
  return (
    <SaveButton
      variant="danger"
      pendingLabel="Deleting…"
      onClick={(e) => {
        if (
          !window.confirm(
            `Delete "${productName}"? This also removes all of its colors and photos. This can't be undone.`
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      Delete product
    </SaveButton>
  );
}
