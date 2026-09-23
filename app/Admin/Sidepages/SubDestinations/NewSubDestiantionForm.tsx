"use client";

import { useRef, useState } from "react";
import { baseUrlPlenty } from "../../../Service/HelperPlenty";
type NewDestination = {
  id: number;
  destination: string;
  airportCode: string;
  image: string;
  status: string;
};

type NewDestinationFormProps = {
  onBack: () => void;
  onSave: (destination: NewDestination) => void;
  editingDestination: NewDestination | null;
};

export default function NewSubDestinationForm({
  onBack,
  onSave,
  editingDestination,
}: NewDestinationFormProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    url: "",
    destination: editingDestination?.destination || "",
    subTitle: "",
    destinationTssId: "",
    countryCode: "",
    airportCode: editingDestination?.airportCode || "",
    latitude: "",
    longitude: "",
    image: null as File | null,
    hotelGiata: "",
    starRating: "",

    showPopularMenus: false,
    showAllDestinationMenus: false,
    showCitiesMenus: false,
    showInSearch: false,
    showSearchTopSeller: false,
    showSearchTopCity: false,

    information: "",
    thingsToDo: "",
    deals: "",
    travelGuide: "",

    currency: "",
    language: "",
    timeZone: "",
    avgFlightTime: "",
    peakTravel: "",

    springTemperature: "",
    springInfo: "",
    summerTemperature: "",
    summerInfo: "",
    autumnTemperature: "",
    autumnInfo: "",
    winterTemperature: "",
    winterInfo: "",

    resorts: "",
    topHotel: "",

    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",

    status: "1",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Add every form field
      data.append("url", formData.url);
      data.append("destination", formData.destination);
      data.append("subTitle", formData.subTitle);
      data.append("destinationTssId", formData.destinationTssId);
      data.append("countryCode", formData.countryCode);
      data.append("airportCode", formData.airportCode);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);

      data.append("hotelGiata", formData.hotelGiata);
      data.append("starRating", formData.starRating);

      data.append("showPopularMenus", String(formData.showPopularMenus));

      data.append(
        "showAllDestinationMenus",
        String(formData.showAllDestinationMenus),
      );

      data.append("showCitiesMenus", String(formData.showCitiesMenus));

      data.append("showInSearch", String(formData.showInSearch));

      data.append("showSearchTopSeller", String(formData.showSearchTopSeller));

      data.append("showSearchTopCity", String(formData.showSearchTopCity));

      data.append("information", formData.information);
      data.append("thingsToDo", formData.thingsToDo);
      data.append("deals", formData.deals);
      data.append("travelGuide", formData.travelGuide);

      data.append("currency", formData.currency);
      data.append("language", formData.language);
      data.append("timeZone", formData.timeZone);
      data.append("avgFlightTime", formData.avgFlightTime);
      data.append("peakTravel", formData.peakTravel);

      data.append("springTemperature", formData.springTemperature);
      data.append("springInfo", formData.springInfo);

      data.append("summerTemperature", formData.summerTemperature);
      data.append("summerInfo", formData.summerInfo);

      data.append("autumnTemperature", formData.autumnTemperature);
      data.append("autumnInfo", formData.autumnInfo);

      data.append("winterTemperature", formData.winterTemperature);
      data.append("winterInfo", formData.winterInfo);

      data.append("resorts", formData.resorts);
      data.append("topHotel", formData.topHotel);

      data.append("metaTitle", formData.metaTitle);
      data.append("metaKeywords", formData.metaKeywords);
      data.append("metaDescription", formData.metaDescription);

      data.append("status", formData.status);

      // Add image only if selected
      if (formData.image) {
        data.append("image", formData.image);
      }

      // EDIT
      if (editingDestination) {
        data.append("id", String(editingDestination.id));
      }

      const response = await fetch(`${baseUrlPlenty}/destinations`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to save destination");
      }

      const result = await response.json();

      console.log("API response:", result);

      // Update the local table after successful API request
      const newDestination: NewDestination = {
        id:
          result?.data?.id ||
          result?.id ||
          editingDestination?.id ||
          Date.now(),

        destination: formData.destination,

        airportCode: formData.airportCode,

        image:
          result?.data?.image ||
          result?.image ||
          imagePreview ||
          editingDestination?.image ||
          "",

        status: formData.status === "1" ? "Active" : "Inactive",
      };

      onSave(newDestination);
    } catch (error) {
      console.error("Error saving destination:", error);

      alert("Failed to save destination. Please try again.");
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);

    setFormData((prev) => ({
      ...prev,
      image: null,
    }));

    // Clear file input
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-stone-200 px-5 py-3">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">
            Add Sub Destination
          </h1>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="rounded-lg bg-stone-200 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-300"
        >
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* STATUS */}
        <FormSection title="Status">
          <div className="flex items-center gap-10">
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="radio"
                name="status"
                value="1"
                checked={formData.status === "1"}
                onChange={handleChange}
              />
              Active
            </label>

            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="radio"
                name="status"
                value="0"
                checked={formData.status === "0"}
                onChange={handleChange}
              />
              Inactive
            </label>
          </div>
        </FormSection>

        {/* GENERAL INFORMATION */}
        <FormSection title="General Information">
          <FormInput
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />

          <FormInput
            label="Destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          />
          <FormInput
            label="Main Destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          />

          <FormTextarea
            label="Sub Title"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
            rows={1}
          />

          <FormInput
            label="Destination TSS ID"
            name="destinationTssId"
            value={formData.destinationTssId}
            onChange={handleChange}
          />

          <FormInput
            label="Country Code 2 Letter"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
          />

          <FormInput
            label="Airport Code"
            name="airportCode"
            value={formData.airportCode}
            onChange={handleChange}
          />

          <FormInput
            label="Latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />

          <FormInput
            label="Longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />

          {/* IMAGE */}
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Image
            </label>

            <div className="flex items-start gap-4">
              {/* IMAGE PREVIEW */}
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Destination preview"
                    className="h-20 w-32 rounded-lg border border-stone-200 object-cover"
                  />

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-2 w-full rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* FILE INPUT */}
              <div className="flex-1">
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                />

                <p className="mt-1 text-xs text-stone-400">
                  Recommended size: 1600 × 580 pixels
                </p>
              </div>
            </div>
          </div>

          <FormInput
            label="Hotel Giata"
            name="hotelGiata"
            value={formData.hotelGiata}
            onChange={handleChange}
          />

          <FormInput
            label="Star Rating"
            name="starRating"
            value={formData.starRating}
            onChange={handleChange}
          />
        </FormSection>

        {/* SHOW IN PAGES */}
        <FormSection title="Show in Pages">
          <FormCheckbox
            label="Show in Popular Menus"
            name="showPopularMenus"
            checked={formData.showPopularMenus}
            onChange={handleChange}
          />

          <FormCheckbox
            label="Show in All Destination Menus"
            name="showAllDestinationMenus"
            checked={formData.showAllDestinationMenus}
            onChange={handleChange}
          />

          <FormCheckbox
            label="Show in Cities Menus"
            name="showCitiesMenus"
            checked={formData.showCitiesMenus}
            onChange={handleChange}
          />

          <FormCheckbox
            label="Show in Search"
            name="showInSearch"
            checked={formData.showInSearch}
            onChange={handleChange}
          />

          <FormCheckbox
            label="Show in Search Top Seller"
            name="showSearchTopSeller"
            checked={formData.showSearchTopSeller}
            onChange={handleChange}
          />

          <FormCheckbox
            label="Show in Search Top City"
            name="showSearchTopCity"
            checked={formData.showSearchTopCity}
            onChange={handleChange}
          />
        </FormSection>

        {/* CONTENT */}
        <FormSection title="Content">
          <FormTextarea
            label="Information"
            name="information"
            value={formData.information}
            onChange={handleChange}
            rows={4}
          />

          <FormTextarea
            label="Things to Do"
            name="thingsToDo"
            value={formData.thingsToDo}
            onChange={handleChange}
            rows={4}
          />

          <FormTextarea
            label="Deals"
            name="deals"
            value={formData.deals}
            onChange={handleChange}
            rows={4}
          />

          <FormTextarea
            label="Travel Guide"
            name="travelGuide"
            value={formData.travelGuide}
            onChange={handleChange}
            rows={4}
          />
        </FormSection>

        {/* INFORMATION */}
        <FormSection title="Information">
          <FormInput
            label="Currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          />

          <FormInput
            label="Language"
            name="language"
            value={formData.language}
            onChange={handleChange}
          />

          <FormInput
            label="Time Zone"
            name="timeZone"
            value={formData.timeZone}
            onChange={handleChange}
          />

          <FormInput
            label="Avg. Flight Time"
            name="avgFlightTime"
            value={formData.avgFlightTime}
            onChange={handleChange}
          />

          <FormInput
            label="Peak Travel"
            name="peakTravel"
            value={formData.peakTravel}
            onChange={handleChange}
          />
        </FormSection>

        {/* WEATHER INFORMATION */}
        <FormSection title="Weather Information">
          <FormInput
            label="Spring Temperature"
            name="springTemperature"
            value={formData.springTemperature}
            onChange={handleChange}
          />

          <FormTextarea
            label="Spring Info"
            name="springInfo"
            value={formData.springInfo}
            onChange={handleChange}
            rows={1}
          />

          <FormInput
            label="Summer Temperature"
            name="summerTemperature"
            value={formData.summerTemperature}
            onChange={handleChange}
          />

          <FormTextarea
            label="Summer Info"
            name="summerInfo"
            value={formData.summerInfo}
            onChange={handleChange}
            rows={1}
          />

          <FormInput
            label="Autumn Temperature"
            name="autumnTemperature"
            value={formData.autumnTemperature}
            onChange={handleChange}
          />

          <FormTextarea
            label="Autumn Info"
            name="autumnInfo"
            value={formData.autumnInfo}
            onChange={handleChange}
            rows={1}
          />

          <FormInput
            label="Winter Temperature"
            name="winterTemperature"
            value={formData.winterTemperature}
            onChange={handleChange}
          />

          <FormTextarea
            label="Winter Info"
            name="winterInfo"
            value={formData.winterInfo}
            onChange={handleChange}
            rows={1}
          />
        </FormSection>

        {/* HOTELS */}
        <FormSection title="Hotels">
          <FormTextarea
            label="Resorts"
            name="resorts"
            value={formData.resorts}
            onChange={handleChange}
          />

          <FormTextarea
            label="Top Hotel"
            name="topHotel"
            value={formData.topHotel}
            onChange={handleChange}
          />
        </FormSection>

        {/* SEO */}
        <FormSection title="SEO Meta Data Information">
          <FormInput
            label="Meta Title"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
          />

          <FormTextarea
            label="Meta Keywords"
            name="metaKeywords"
            value={formData.metaKeywords}
            onChange={handleChange}
            rows={2}
          />

          <FormTextarea
            label="Meta Description (Max 300 Characters)"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            rows={2}
          />
        </FormSection>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 border-t border-stone-200 bg-stone-50 px-6 py-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-stone-300 bg-white px-5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-violet-600 px-6 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            Save Destination
          </button>
        </div>
      </form>
    </div>
  );
}

/* ========================================================= */
/* REUSABLE SECTION */
/* ========================================================= */

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-stone-200">
      <div className="bg-stone-100 px-5 py-3">
        <h2 className="text-sm font-semibold text-stone-800">{title}</h2>
      </div>

      <div className="grid grid-cols-2 gap-1 p-5 md:grid-cols-3">
        {children}
      </div>
    </section>
  );
}

/* ========================================================= */
/* INPUT */
/* ========================================================= */

function FormInput({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-stone-700">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
      />
    </div>
  );
}

/* ========================================================= */
/* TEXTAREA */
/* ========================================================= */

function FormTextarea({
  label,
  name,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-stone-700">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full resize-y rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
      />
    </div>
  );
}

/* ========================================================= */
/* CHECKBOX */
/* ========================================================= */

function FormCheckbox({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  checked: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}) {
  return (
    <label className="flex min-h-[42px] items-center gap-3 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-violet-600"
      />

      <span>{label}</span>
    </label>
  );
}
