// src/pages/SelectDetails.jsx
import { useState, useEffect } from "react";

const SelectDetails = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    price: "",
    time: "",
    airline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (onFilterChange) onFilterChange(filters);
  }, [filters]);

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <div className="flex flex-wrap items-center justify-start gap-3 mt-10 lg:mt-6">
        <select
          name="price"
          className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-2 cursor-pointer rounded-md"
          value={filters.price}
          onChange={handleChange}
        >
          <option value="">Faixa de preço</option>
          <option value="100-300">R$100 - R$300</option>
          <option value="300-600">R$300 - R$600</option>
          <option value="600-1000">R$600 - R$1000</option>
        </select>

        <select
          name="time"
          className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-2 cursor-pointer rounded-md"
          value={filters.time}
          onChange={handleChange}
        >
          <option value="">Horário</option>
          <option value="morning">Manhã</option>
          <option value="afternoon">Tarde</option>
          <option value="night">Noite</option>
        </select>

        <select
          name="airline"
          className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-2 cursor-pointer rounded-md"
          value={filters.airline}
          onChange={handleChange}
        >
          <option value="">Companhias</option>
          <option value="Hawaiian Airlines">Hawaiian Airlines</option>
          <option value="United Airlines">United Airlines</option>
        </select>
      </div>
    </div>
  );
};

export default SelectDetails;
