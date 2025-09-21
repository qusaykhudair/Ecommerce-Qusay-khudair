import CategorySlider from "./_components/CategorySlider/CategorySlider";
import HomeSlider from "./_components/HomeSlider/HomeSlider";
import HomeProducts from "./_components/HomeProducts/HomeProducts";

export default function Home() {
  return (
 <>
 <div className="container py-8">
<HomeSlider/>
<CategorySlider/>
<HomeProducts/>
 </div>
 </>
  );
}
