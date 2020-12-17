import React from 'react';
import Picture from '../types/Picture';

const PictureCard = ({ picture }: { picture: Picture }) => (
  <div className="space-y-4">
    <div className="aspect-w-3 aspect-h-2">
      <img
        className="object-cover shadow-lg rounded-lg"
        src={picture.url}
        alt=""
      />
    </div>

    <div className="space-y-2">
      <div className="text-lg leading-6 font-medium space-y-1">
        <h3>{picture.title}</h3>
        <p className="text-indigo-600">{picture.description}</p>
      </div>
    </div>
  </div>
);

export default PictureCard;
