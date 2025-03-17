async function fetchAndUpdateData() {
            const url = "https://script.google.com/macros/s/AKfycbzpodq7OW3-4Oon4o-WbJ50xvS_4pMgv3NoDIMqvFufCOn4kG2-x0aZIat7y1FmlWM7/exec";

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.length > 0) {
                    const obj = data[0]; // ใช้ข้อมูลตัวแรกใน JSON

                    // 🔹 วนลูปใส่ค่าลงใน id ที่ตรงกับ key ใน JSON
                    Object.keys(obj).forEach(key => {
                        const element = document.getElementById(key);
                        if (element) {
                            element.innerText = obj[key]; // ใส่ค่าลงใน HTML
                        }
                    });

                    // 🔹 คำนวณค่าเพิ่มเติม
                    const sumMayor = (obj.mc1n1 || 0) + (obj.mc1n2 || 0);
                    const dMayor = sumMayor + (obj.noMayor || 0);
                    const sumMc1 = (obj.mc1n1 || 0) + (obj.mc1n2 || 0);
                    const dMc1r = sumMc1 + (obj.noMc1 || 0);
                    const sumMc2 = (obj.mc2n1 || 0) + (obj.mc2n2 || 0);
                    const dMc2r = sumMc2 + (obj.noMc2 || 0);

                    // 🔹 อัปเดตค่าใน id เฉพาะที่คำนวณ
                    document.getElementById("SumMayor").innerText = sumMayor;
                    document.getElementById("DMayor").innerText = dMayor;
                    document.getElementById("SumMc1").innerText = sumMc1;
                    document.getElementById("DMc1r").innerText = dMc1r;
                    document.getElementById("SumMc2").innerText = sumMc2;
                    document.getElementById("DMc2r").innerText = dMc2r;

                    console.log("อัปเดตข้อมูลเรียบร้อย", obj);
                } else {
                    console.log("ไม่มีข้อมูลที่โหลดมาได้");
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
            }
        }

        // 🔹 เรียกใช้งานฟังก์ชันเมื่อโหลดหน้าเว็บ
        fetchAndUpdateData();
