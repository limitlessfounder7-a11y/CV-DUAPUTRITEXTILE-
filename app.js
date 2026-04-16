const { useState, useEffect } = React;

const App = () => {
    // State untuk Pengaturan Perusahaan (Tersimpan di LocalStorage)
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('dua_putri_settings');
        return saved ? JSON.parse(saved) : {
            phone: '087826978051',
            email: 'yusuf6012kps@gmail.com',
            npwp: '-',
            address: 'Desa Cilangkap, Kecamatan Babakan Cikao, Kode Pos 41151, Purwakarta'
        };
    });

    // State untuk Form DO
    const [formData, setFormData] = useState({
        logoUrl: 'logo.png', // Default diganti ke PNG
        doNo: '',
        date: new Date().toISOString().split('T')[0],
        refScNo: '',
        customerName: '',
        customerAddress: '',
        customerNpwp: '',
        truckNo: '',
        driverName: '',
        description: 'GRADE B1 PRODUCT',
        fullWeight: '',
        emptyWeight: '',
    });

    const [netWeight, setNetWeight] = useState(null);
    const [showSettings, setShowSettings] = useState(false);

    // Simpan pengaturan ke localStorage
    useEffect(() => {
        localStorage.setItem('dua_putri_settings', JSON.stringify(settings));
    }, [settings]);

    // Kalkulasi Berat Bersih
    useEffect(() => {
        const full = parseFloat(formData.fullWeight);
        const empty = parseFloat(formData.emptyWeight);
        if (!isNaN(full) && !isNaN(empty)) {
            const res = full - empty;
            setNetWeight(res > 0 ? res : 0);
        } else {
            setNetWeight(null);
        }
    }, [formData.fullWeight, formData.emptyWeight]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSettingChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    // Helper: Menampilkan angka atau blank (hanya teks KG)
    const renderNum = (val) => {
        if (!val || parseFloat(val) === 0) return <span className="opacity-0">0000</span>;
        return <strong>{parseFloat(val).toLocaleString()}</strong>;
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* BAGIAN INPUT (KIRI) */}
                <div className="lg:col-span-4 space-y-6 no-print">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-extrabold text-slate-800 uppercase italic">Input DO</h2>
                            <button 
                                onClick={() => setShowSettings(!showSettings)}
                                className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all border border-slate-300"
                                title="Pengaturan Perusahaan"
                            >
                                ⚙️ Settings
                            </button>
                        </div>

                        {showSettings ? (
                            <div className="space-y-4 mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 animate-in fade-in zoom-in duration-200">
                                <h3 className="text-xs font-bold text-indigo-600 uppercase">Pengaturan Perusahaan</h3>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Nama File Logo</label>
                                    <input type="text" name="logoUrl" value={formData.logoUrl} onChange={handleInput} className="w-full p-2 text-xs border rounded" placeholder="Contoh: logo.png atau logo.jpg" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">No. Telp</label>
                                    <input type="text" name="phone" value={settings.phone} onChange={handleSettingChange} className="w-full p-2 text-xs border rounded" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Email</label>
                                    <input type="text" name="email" value={settings.email} onChange={handleSettingChange} className="w-full p-2 text-xs border rounded" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">NPWP</label>
                                    <input type="text" name="npwp" value={settings.npwp} onChange={handleSettingChange} className="w-full p-2 text-xs border rounded" />
                                </div>
                                <button onClick={() => setShowSettings(false)} className="w-full py-2 bg-indigo-600 text-white text-xs font-bold rounded shadow-md hover:bg-indigo-700">Simpan Pengaturan</button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" name="doNo" placeholder="Nomor DO" onChange={handleInput} className="p-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                                    <input type="date" name="date" value={formData.date} onChange={handleInput} className="p-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                                <input type="text" name="customerName" placeholder="Nama Pelanggan" onChange={handleInput} className="w-full p-2 border rounded font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
                                <textarea name="customerAddress" placeholder="Alamat Tujuan" onChange={handleInput} className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none" rows="2"></textarea>
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" name="truckNo" placeholder="No. Truk" onChange={handleInput} className="p-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                                    <input type="text" name="driverName" placeholder="Nama Sopir" onChange={handleInput} className="p-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400">ISI (KG)</label>
                                        <input type="number" name="fullWeight" placeholder="0" onChange={handleInput} className="w-full p-2 border rounded mt-1" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400">KOSONG (KG)</label>
                                        <input type="number" name="emptyWeight" placeholder="0" onChange={handleInput} className="w-full p-2 border rounded mt-1" />
                                    </div>
                                </div>
                                <button onClick={() => window.print()} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black transition-all active:scale-95">
                                    CETAK / DOWNLOAD PDF
                                </button>
                                <p className="text-[10px] text-slate-400 text-center uppercase tracking-tighter">Berat 0 = Blank (Untuk Revisi Pulpen)</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* AREA PRATINJAU (KANAN) */}
                <div className="lg:col-span-8 flex justify-center bg-slate-400 p-4 rounded-2xl overflow-auto shadow-inner">
                    <div id="print-area" className="bg-white p-[12mm] text-black shadow-2xl print:shadow-none print:m-0" style={{ width: '210mm', minHeight: '297mm' }}>
                        
                        {/* Kop Surat */}
                        <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-4">
                            <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                                <img src={formData.logoUrl} onError={(e) => e.target.style.display='none'} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="text-center flex-1 px-4">
                                <h1 className="text-2xl font-black leading-none mb-1">CV DUA PUTRI TEXTILE</h1>
                                <p className="text-[8.5pt] leading-tight font-medium">
                                    {settings.address}<br/>
                                    Telp: {settings.phone} | Email: {settings.email}<br/>
                                    NPWP: {settings.npwp}
                                </p>
                            </div>
                            <div className="w-24 h-24 invisible"></div>
                        </div>

                        <h2 className="text-center text-xl font-bold underline mb-8 tracking-tighter">DELIVERY ORDER</h2>

                        <div className="flex justify-between mb-8 text-[10pt]">
                            <div className="w-[58%] space-y-1">
                                <div className="flex"><span className="w-12">To:</span> <span className="flex-1 font-bold border-b border-dotted border-black uppercase">{formData.customerName || " "}</span></div>
                                <div className="flex"><span className="w-12"></span> <span className="flex-1 text-[9pt] min-h-[3rem]">{formData.customerAddress || " "}</span></div>
                                <div className="flex pt-4"><span>By Truck No: </span> <span className="font-bold border-b border-black px-4 ml-2">{formData.truckNo || "       "}</span> <span className="ml-4">Driver: </span> <span className="font-bold border-b border-black px-4 ml-2">{formData.driverName || "       "}</span></div>
                            </div>
                            <div className="w-[38%] border-2 border-black p-4">
                                <div className="flex justify-between"><span>DO. No</span> <span>: <strong>{formData.doNo}</strong></span></div>
                                <div className="flex justify-between mt-1"><span>Date</span> <span>: {formData.date}</span></div>
                                <div className="flex justify-between mt-1"><span>Ref S.C</span> <span>: {formData.refScNo || "-"}</span></div>
                            </div>
                        </div>

                        <table className="w-full border-2 border-black border-collapse text-[10pt]">
                            <thead>
                                <tr className="bg-slate-50 border-b-2 border-black">
                                    <th className="p-3 text-left w-[70%] border-r border-black">DESCRIPTION OF GOODS</th>
                                    <th className="p-3 text-center">QUANTITY</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-5 h-[380px] align-top relative border-r border-black">
                                        <div className="font-bold text-lg underline uppercase">{formData.description}</div>
                                        <div className="absolute bottom-10 left-6 space-y-2">
                                            <p className="font-bold text-[9pt] underline uppercase">Truck Details:</p>
                                            <div className="flex justify-between w-80"><span>ACTUAL WEIGHT FULL</span> <span>= {renderNum(formData.fullWeight)} KG</span></div>
                                            <div className="flex justify-between w-80"><span>ACTUAL WEIGHT EMPTY</span> <span>= {renderNum(formData.emptyWeight)} KG</span></div>
                                            <div className="flex justify-between w-80 mt-4 pt-2 border-t border-black font-bold text-xl"><span>NET WEIGHT</span> <span>= {renderNum(netWeight)} KG</span></div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-right align-top font-bold text-xl">
                                        {renderNum(netWeight)} KG
                                    </td>
                                </tr>
                                <tr className="font-black text-lg bg-slate-50 border-t-2 border-black">
                                    <td className="p-3 text-right border-r border-black">TOTAL :</td>
                                    <td className="p-3 text-right">{renderNum(netWeight)} KG</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-between mt-16 text-center text-[10pt] font-bold">
                            <div className="w-1/3">
                                <p>Prepared by,</p>
                                <div className="h-24"></div>
                                <p className="border-t border-black inline-block px-10">( .......................... )</p>
                            </div>
                            <div className="w-1/3 px-2">
                                <p>Material received by:<br/><span className="text-[8pt] font-normal italic leading-none">(in good condition)</span></p>
                                <div className="h-20"></div>
                                <p className="border-t border-black inline-block px-10">( .......................... )</p>
                            </div>
                            <div className="w-1/3">
                                <p>For CV DUA PUTRI TEXTILE</p>
                                <div className="h-24"></div>
                                <p className="border-t border-black inline-block px-10">( .......................... )</p>
                            </div>
                        </div>

                        <div className="mt-20 pt-4 border-t border-black text-center text-[8pt] text-gray-600 font-bold uppercase tracking-widest">
                            Factory: {settings.address}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);