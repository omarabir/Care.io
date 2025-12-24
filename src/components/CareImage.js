"use client";

export default function CareImage() {
  return (
    <div className="aspect-square bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl shadow-2xl overflow-hidden">
      <img
        src="/images/care-family.jpg"
        alt="Care Service"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.parentElement.innerHTML =
            '<div class="w-full h-full flex items-center justify-center text-white text-6xl">👨‍👩‍👧‍👦</div>';
        }}
      />
    </div>
  );
}
