import React from "react";

const renderProductImages = (product, color) => {
  let shirtSrc = "";
  if (product.type === "t-shirt") shirtSrc = "/assets/img/crew_front.png";
  if (product.type === "hoodie") shirtSrc = "/assets/img/mens_hoodie_front.png";

  const designs = {
    front: product.designs.front,
    back: product.designs.back,
  };

  if (!designs.front) return null;

  return Object.keys(designs).map((key) => {
    return (
      <div
        style={{
          position: "relative",
          background: color || product.availableColors[0],
        }}
      >
        <img
          src={shirtSrc.replace("front", key)}
          style={{ width: "100%", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: "16% 31% 20.5%",
          }}
        >
          {product.designs[key] ? (
            <img
              src={product.designs[key]}
              style={{
                display: "block",
                width: "100%",
              }}
            />
          ) : null}
        </div>
      </div>
    );
  });
};

export { renderProductImages };
