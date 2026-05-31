import React from 'react';

const ProductGrid = ({ children }) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {children}
  </div>
);

export default ProductGrid;
