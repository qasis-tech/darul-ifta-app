import { Typography } from "@mui/material";
import React from "react";
import "./written.styles.scss";
export default function WrittenSection() {
  return (
    <div className="written-section mt-4">
      <div className="container">
        <div className="col-md-12 heading">
          <Typography variant="h6" className="main-heading">
            Written By : Mufti Haris Al Kausari, Kerala
          </Typography>
        </div>
        <div className="col-md-12 my-2">
          <div className="written-desc">
            السلام علیکم بندہ امریکہ میں مستقل رہائش رکھتا ہے۔ بندہ کے اپنے گھر
            والی سے اختلافات ہیں جن کی وجہ سے علیحدگی تک نوبت آچکی ہے۔ چونکہ ہم
            امریکہ میں رہتے ہیں اس لئے شادی طلاق وغیرہ میں یہاں کی عدالتیں مقامی
            قوانین کے مطابق فیصلے دیتی ہیں۔ عدالتی طلاق کے فیصلے کے بغیر دوسری
            شادی نہیں کی جا سکتی، اس لیے براہ کرم بندہ کے اس سلسلے کے چند سوالات
            کے جوابات عنایت فرمائیں جو بندہ اور یہاں کے دیگر رہائشی حضرات کے لئے
          </div>
        </div>
      </div>
      <div className="container verified-section py-4 ">
        <div className="col-md-12">
            <Typography variant="h6" className="verified-head">
                Verified By :
            </Typography>
        </div>
        <div className="col-md-12">
            <Typography variant="h6" className="sub">
                Mufti Rajeeb Al Qasimi , Kerala
            </Typography>
            <Typography variant="h6" className="sub">
                Maulana Al Kausari, Kerala
            </Typography>
        </div>
      </div>
    </div>
  );
}
