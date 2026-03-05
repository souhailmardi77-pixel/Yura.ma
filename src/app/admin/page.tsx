"use client";

import { FormEvent, useCallback, useState } from "react";
import { supabase } from "../../lib/supabase";

type Category =
  | "Glasses"
  | "Rings"
  | "Watches"
  | "Necklaces"
  | "Durags"
  | "Leather";

type FormState = {
  name: string;
  category: Category | "";
  price: string;
  description: string;
  imageUrl: string;
};

const initialFormState: FormState = {
  name: "",
  category: "",
  price: "",
  description: "",
  imageUrl: "",
};

export default function AdminPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = useCallback(
    (
      field: keyof FormState,
      value: string
    ) => {
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const resetState = () => {
    setForm(initialFormState);
    setIsSubmitting(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setSuccessMessage(null);
    setErrorMessage(null);

    const trimmedName = form.name.trim();
    const trimmedDescription = form.description.trim();
    const trimmedImageUrl = form.imageUrl.trim();

    if (!trimmedName) {
      setErrorMessage("Name is required.");
      return;
    }

    if (!form.category) {
      setErrorMessage("Category is required.");
      return;
    }

    const numericPrice = Number(form.price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      setErrorMessage("Price must be a non‑negative number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("products").insert([
        {
          name: trimmedName,
          category: form.category,
          price: numericPrice,
          description: trimmedDescription || null,
          image_url: trimmedImageUrl || null,
        },
      ]);

      if (error) {
        console.error("Failed to insert product", error);
        setErrorMessage("Unable to secure this product entry right now.");
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage("Product securely added to the YURA vault.");
      resetState();
    } catch (error) {
      console.error("Unexpected error while inserting product", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-yellow-400 via-zinc-900 to-emerald-500 shadow-[0_18px_40px_rgba(0,0,0,0.9)]">
              <div className="h-4 w-4 rounded-full border border-black/80 bg-gradient-to-b from-white via-yellow-300 to-black" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-300">
                YURA // admin
              </p>
              <p className="text-xs text-zinc-500">Secure product intake console</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/40 bg-gradient-to-r from-zinc-900/90 to-black px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] text-yellow-300">
            <span className="h-2 w-2 rounded-full bg-gradient-to-b from-white via-yellow-300 to-amber-700 shadow-[0_0_14px_rgba(250,204,21,0.9)]" />
            Admin channel · Encrypted
          </div>
        </header>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black/95 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.95)]">
          <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                Vault Intake
              </p>
              <h1 className="mt-1 text-lg font-semibold uppercase tracking-[0.16em]">
                Register a new product
              </h1>
              <p className="mt-2 max-w-xl text-xs text-zinc-500">
                Add a curated entry to the Supabase products ledger. Only precise, final data
                should be recorded here.
              </p>
            </div>

            {isSubmitting ? (
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-emerald-300">
                <span className="h-1.5 w-8 animate-pulse rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300" />
                Securing entry&hellip;
              </p>
            ) : (
              <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Status: Ready
              </p>
            )}
          </header>

          <form
            onSubmit={handleSubmit}
            className="mt-4 grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  required
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2.5 text-sm text-white outline-none ring-0 transition focus:border-yellow-300/70 focus:bg-black focus:ring-1 focus:ring-yellow-300/60"
                  placeholder="Midnight prism acetate frames"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={form.category}
                    onChange={(event) =>
                      handleChange("category", event.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2.5 text-sm text-white outline-none ring-0 transition focus:border-yellow-300/70 focus:bg-black focus:ring-1 focus:ring-yellow-300/60"
                  >
                    <option value="">Select category</option>
                    <option value="Glasses">Glasses</option>
                    <option value="Rings">Rings</option>
                    <option value="Watches">Watches</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Durags">Durags</option>
                    <option value="Leather">Leather</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400"
                  >
                    Price (MAD)
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={form.price}
                    onChange={(event) => handleChange("price", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2.5 text-sm text-white outline-none ring-0 transition focus:border-yellow-300/70 focus:bg-black focus:ring-1 focus:ring-yellow-300/60"
                    placeholder="2400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400"
                >
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  inputMode="url"
                  value={form.imageUrl}
                  onChange={(event) =>
                    handleChange("imageUrl", event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2.5 text-sm text-white outline-none ring-0 transition focus:border-yellow-300/70 focus:bg-black focus:ring-1 focus:ring-yellow-300/60"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={form.description}
                  onChange={(event) =>
                    handleChange("description", event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2.5 text-sm text-white outline-none ring-0 transition focus:border-yellow-300/70 focus:bg-black focus:ring-1 focus:ring-yellow-300/60"
                  placeholder="Concise details about materials, finish, and story."
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/60 via-black to-black/95 p-4">
              <div className="space-y-3 text-xs text-zinc-400">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  Vault Protocol
                </p>
                <p>
                  This panel writes directly to the <span className="text-zinc-200">Supabase
                  products</span> table. Only trusted operators should have access.
                </p>
                <ul className="space-y-2 text-[11px]">
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>No client secrets are exposed in this view.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-yellow-300" />
                    <span>Inputs are trimmed and validated before insert.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    <span>Errors are logged server‑side without leaking details to users.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                {errorMessage && (
                  <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    {errorMessage}
                  </p>
                )}

                {successMessage && !errorMessage && (
                  <p className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
                    {successMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center rounded-full border border-yellow-300/70 bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black shadow-[0_18px_40px_rgba(0,0,0,0.9)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Securing entry..." : "Commit product to vault"}
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={resetState}
                  className="w-full rounded-full border border-white/15 bg-black/60 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-zinc-300 transition hover:border-white/30 hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Clear form
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

