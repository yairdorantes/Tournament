import FormBuy from "./FormBuy";

export const ListBuilds = () => {
  return (
    <div
      className="bg-white p-2 h-screen  grid grid-cols-2 gap-2 "
      data-theme="light"
    >
      <div>
        <div
          id="item"
          className="flex gap-4 mb-2 h-36 rounded-md border-2 border-black"
        >
          <div className="rounded-md w-1/2 flex gap-2">
            <img
              src="https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg"
              alt=""
              className="w-44 h-full rounded-sm"
            />
            <div id="info">
              <h2 className="font-bold">Edificio uno</h2>
            </div>
          </div>
        </div>
        {/* <FormBuy /> */}
      </div>
      <div className="maps h-1/2 ">
        <iframe
          //   className="w-2"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241132.0686954974!2d-99.77721831478169!3d19.208799938055684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd89c005eb8ee1%3A0x77858c403533d53c!2sUniversidad%20Tres%20Culturas%20%7C%20Toluca%20%7C%20UTC!5e0!3m2!1ses-419!2smx!4v1687819264924!5m2!1ses-419!2smx"
          width="100%"
          height="100%"
          allowfullscreen=""
          loading="lazy"
          className="rounded-sm"
          // referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
