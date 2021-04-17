import React from 'react';

export default function HashTag({ children }) {
  return (
    <span style={{ color: 'red', backgroundColor: 'blue' }}>
      hash{children}
    </span>
  );
}
