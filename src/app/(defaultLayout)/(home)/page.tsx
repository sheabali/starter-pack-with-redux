import TournamentsCard from "@/components/shared/TournamentsCard/TournamentsCard";

export default function Home() {
  const cardData = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1559552673-350e98ba6a1f?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Summer Football Championship 2025",
      date: "Jan 15 - 20, 2025",
      location: "Central Sports Complex, Miami",
      price: 150,
      category: "Grass/Turf",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1559552673-350e98ba6a1f?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Summer Football Championship 2025",
      date: "Jan 15 - 20, 2025",
      location: "Central Sports Complex, Miami",
      price: 150,
      category: "Grass/Turf",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1559552673-350e98ba6a1f?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Summer Football Championship 2025",
      date: "Jan 15 - 20, 2025",
      location: "Central Sports Complex, Miami",
      price: 150,
      category: "Grass/Turf",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1559552673-350e98ba6a1f?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Summer Football Championship 2025",
      date: "Jan 15 - 20, 2025",
      location: "Central Sports Complex, Miami",
      price: 150,
      category: "Grass/Turf",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {cardData.map((card, index) => (
        <TournamentsCard key={index} card={card} />
      ))}
    </div>
  );
}
