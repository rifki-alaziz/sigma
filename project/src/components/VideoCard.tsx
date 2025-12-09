import React from "react";

// Perbarui interface props untuk menambahkan 'onLoad'
interface VideoCardProps {
  title: string;
  subtitle: string;
  videoUrl: string;
  excerpt: string;
  onLoad?: () => void; // Properti baru untuk menangani event onLoad
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  subtitle,
  videoUrl,
  excerpt,
  onLoad,
}) => {
  // Memastikan onLoad hanya dipanggil jika ada
  const handleOnLoad = () => {
    if (onLoad) {
      onLoad(); // Menjalankan event handler onLoad jika ada
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group">
      <div className="overflow-hidden rounded-t-xl">
        <iframe
          src={videoUrl}
          title={title}
          className="w-full h-64 sm:h-80 md:h-96 lg:h-112 object-cover group-hover:scale-105 transition-transform duration-300"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleOnLoad} // Menambahkan event handler onLoad
        ></iframe>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{subtitle}</p>
        <h3 className="text-md font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{excerpt}</p>
      </div>
    </div>
  );
};

export default VideoCard;
