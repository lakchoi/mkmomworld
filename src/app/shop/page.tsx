import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";

async function getProducts() {
  return prisma.product.findMany({
    where: { isActive: true },
    include: { category: true, campaign: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <p className="text-orange-400 font-semibold text-sm mb-2">🛍️ 특별한 상품들</p>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800">쇼핑</h1>
        <p className="text-stone-500 mt-2">등급별 특별 할인과 포인트 혜택으로 더 스마트하게 쇼핑하세요</p>
      </div>

      {/* Grade benefit notice */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-100 rounded-2xl p-4 mb-8 flex items-center gap-4">
        <div className="text-3xl">🎁</div>
        <div>
          <p className="font-bold text-stone-700">회원 등급별 혜택!</p>
          <p className="text-sm text-stone-500">등급이 높을수록 더 많은 할인과 포인트 적립 혜택을 받을 수 있어요.</p>
        </div>
        <Link href="/auth/register" className="ml-auto bg-orange-400 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-orange-500 transition-colors whitespace-nowrap">
          회원가입
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🛍️</div>
          <p className="text-stone-400">준비 중인 상품이 곧 등록됩니다!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => {
            const images = (() => { try { return JSON.parse(product.images); } catch { return []; } })();
            const gradePrices = (() => { try { return JSON.parse(product.gradePrices); } catch { return {}; } })();

            return (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-100/60 transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 bg-gradient-to-br from-orange-50 to-pink-50">
                  {images[0] ? (
                    <img src={images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-40">🛍️</div>
                  )}
                  {product.campaign && (
                    <div className="absolute top-2 left-2 bg-orange-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      캠페인
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-stone-800 text-sm mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-stone-400 line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-stone-800">
                        ₩{product.basePrice.toLocaleString()}
                      </p>
                      {Object.keys(gradePrices).length > 0 && (
                        <p className="text-xs text-orange-500">등급별 할인 가능</p>
                      )}
                    </div>
                    <button className="flex items-center gap-1 bg-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-orange-500 transition-colors">
                      <ShoppingBag size={12} />
                      담기
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
