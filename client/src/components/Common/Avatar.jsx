const Avatar = ({ src, alt, size = 40, isOnline = false, showStatus = false }) => {
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      {showStatus && (
        <span
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: size * 0.25,
            height: size * 0.25,
            borderRadius: "50%",
            backgroundColor: isOnline ? "green" : "gray",
            border: "2px solid white",
          }}
        />
      )}
    </div>
  );
};

export default Avatar;