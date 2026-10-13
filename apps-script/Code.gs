/**
 * Izakaya pricing → Google Sheet  (Shiniji)
 * ชีต "ราคาที่เคาะ" มีครบทุกเมนูตั้งแต่แรก (รูป ชื่อ 3 ภาษา ทุน ราคาเดิม ราคาเริ่มต้น)
 * กด "เคาะ" บนเว็บ = เขียนราคาทับในแถวของเมนูนั้น (ไม่สร้างแถวใหม่)
 * ชีต "ประวัติ" เก็บทุกครั้งที่เคาะ / ยกเลิก
 */
var SHEET_ID = '1h080xbJTABfZF8Ku8hPrOeVqXsh-T0bUT7Tq3ROhR-0';
var KEY = 'FsCT_qIE1ZSAUQNn';
var IMG_BASE = 'https://donlaawl-prog.github.io/izk-price-7q/';
var MAIN = 'ราคาที่เคาะ', LOG = 'ประวัติ';
var HEAD = ['รูป','รหัส','หมวด','เมนู','ชื่อไทย','ชื่ออังกฤษ','ชื่อญี่ปุ่น','ทุน/ชิ้น (฿)\nรวมเผื่อ 25%','ราคาเดิม (฿)','ราคาเริ่มต้น (฿)','ราคาที่เคาะ (฿)','Fc%','กำไร/ชิ้น (฿)','สถานะ','เคาะเมื่อ','เป้า Fc%'];
var ITEMS = [["K01", "ไม้", "เดิม", "เห็ดออรินจิย่าง", "Grilled Eryngii Mushrooms", "エリンギ焼き", 6.4, 40, 40], ["K02", "ไม้", "เดิม", "เห็ดหอมสดย่างซอส", "Grilled Shiitake Mushrooms", "生椎茸焼き", 12.33, 40, 40], ["K03", "ไม้", "ใหม่", "มันหวานญี่ปุ่นย่าง", "Grilled Japanese Sweet Potato", "焼きさつまいも串", 10.97, "", 39], ["K04", "ไม้", "ใหม่", "มันหวานญี่ปุ่นชุบทอด", "Satsumaimo Kushiage", "さつまいも串揚げ", 17.85, "", 59], ["K05", "ไม้", "ใหม่", "ไข่หวานย่างเสียบไม้", "Tamagoyaki Kushi", "玉子焼き串", 16.01, "", 49], ["K06", "ไม้", "เดิม", "หนังไก่ทอดซอสเกลือ", "Crispy Chicken Skin", "鶏皮揚げ 塩ダレ", 6.44, 60, 60], ["K07", "ไม้", "เดิม", "ไส้หมูย่าง", "Grilled Pork Intestines", "豚ホルモン焼き", 16.58, 80, 80], ["K08", "ไม้", "ใหม่", "กุ้งย่างเกลือ", "Ebi Shioyaki", "海老塩焼き", 17.79, "", 59], ["K09", "ไม้", "ใหม่", "กุ้งชุบทอด", "Ebi Kushiage", "海老串揚げ", 19.43, "", 59], ["K10", "ไม้", "เดิม", "เนื้อย่างสไตล์ญี่ปุ่น", "Beef Yakiniku", "和風牛串焼き", 28.98, 120, 120], ["K11", "ไม้", "ใหม่", "พิคานย่าย่างเกลือวาซาบิ", "Picanha Shio Wasabi", "ピッカーニャ塩焼き わさび添え", 33.4, "", 99], ["K12", "ไม้", "เดิม", "ยากิโทริ", "Yakitori", "焼き鳥", 11.77, 80, 80], ["K13", "ไม้", "เดิม", "บูตะโทริ", "Butatori", "豚と鶏の串", 14.14, 80, 80], ["K14", "ไม้", "เดิม", "ไก่ย่างสไตล์ญี่ปุ่น", "Grilled Chicken Japanese Style", "和風鶏串焼き", 12.56, 60, 60], ["K15", "ไม้", "ใหม่", "สึคุเนะ ไก่บดปั้นย่าง", "Tsukune", "つくね", 14.32, "", 49], ["K16", "ไม้", "ใหม่", "ปลาไหลย่างซอสคาบายากิ", "Unagi Kabayaki", "うなぎ蒲焼き串", 15.68, "", 49], ["K17", "ไม้", "เดิม", "ท้องแซลมอนเสียบไม้ย่าง", "Salmon Toro Shioyaki", "サーモントロ塩焼き", 58.69, 160, 160], ["K18", "ไม้", "เดิม", "เบคอนพันหน่อไม้ฝรั่ง", "Bacon Wrapped Grilled Asparagus", "アスパラベーコン巻き串", 20.03, 120, 120], ["K19", "ไม้", "เดิม", "สันคอหมูย่างสไตล์ญี่ปุ่น", "Grilled Pork Neck Yakiniku", "豚肩ロース焼肉串", 20.54, 60, 60], ["K20", "ไม้", "ใหม่", "สันคอวัวออสเตรเลียย่างถ่าน", "Grilled Australian Beef Chuck", "豪州産牛肩ロース串", 18.92, "", 59], ["K21", "ไม้", "ใหม่", "ไก่ชุบทอดเสียบไม้", "Tori Kushikatsu", "鶏串カツ", 14.2, "", 49], ["P01", "จาน", "เดิม", "เนื้อคลุกฝุ่น", "Grilled Beef With Toasted Rice Powder", "牛スパイシー焼き", 89.66, 240, 240], ["P02", "จาน", "เดิม", "หมูคลุกฝุ่น", "Grilled Pork With Toasted Rice Powder", "豚スパイシー焼き", 57.91, 120, 120], ["P03", "จาน", "เดิม", "คอหมูย่าง", "Grilled Pork Jowl", "豚トロ塩焼き", 60.41, 160, 160], ["P04", "จาน", "ใหม่", "เต้าหู้ทอดราดซุปดาชิ", "Agedashi Tofu", "揚げ出し豆腐", 37.82, "", 109], ["P05", "จาน", "ใหม่", "กะหล่ำปลีเกลือ", "Shio Cabbage", "塩キャベツ", 7.49, "", 29], ["P06", "จาน", "ใหม่", "ไก่นัมบัน", "Chicken Nanban", "チキン南蛮", 37.81, "", 109], ["P07", "จาน", "ใหม่", "โกมะซาบะ ปลาซาบะงา", "Goma Saba", "ごまさば", 60.83, "", 179], ["P08", "จาน", "ใหม่", "หอยนางรมเนยอบฟอยล์", "Kaki Butter Foil-yaki", "牡蠣バターホイル焼き", 73.02, "", 209], ["P09", "จาน", "ใหม่", "มันฝรั่งเนย", "Jaga Butter", "じゃがバター", 19.72, "", 59], ["P10", "จาน", "ใหม่", "ไข่ม้วนหมูสไตล์โอซาก้า", "Tonpeiyaki", "とん平焼き", 42.68, "", 129]];

function doGet() { return ContentService.createTextOutput('ok'); }

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.key !== KEY) return out_('bad key');
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sh = ss.getSheetByName(MAIN) || build_(ss);
    var lg = ss.getSheetByName(LOG);
    var row = findRow_(sh, d.id);
    if (!row) return out_('unknown id');
    var now = new Date();
    if (d.action === 'unknock') {
      sh.getRange(row, 11).clearContent();
      sh.getRange(row, 15, 1, 2).clearContent();
      lg.appendRow([now, 'ยกเลิกการเคาะ', d.id, sh.getRange(row, 5).getValue(), '', '']);
    } else {
      sh.getRange(row, 11).setValue(Number(d.price));
      sh.getRange(row, 15, 1, 2).setValues([[now, Number(d.target) / 100]]);
      lg.appendRow([now, 'เคาะ', d.id, sh.getRange(row, 5).getValue(), Number(d.price), Number(d.fc) / 100]);
    }
    lg.getRange(lg.getLastRow(), 6).setNumberFormat('0.0%');
    return out_('ok');
  } catch (err) {
    return out_('error: ' + err);
  } finally {
    lock.releaseLock();
  }
}

function out_(t) { return ContentService.createTextOutput(t); }

function findRow_(sh, id) {
  var ids = sh.getRange(2, 2, Math.max(sh.getLastRow() - 1, 1), 1).getValues();
  for (var i = 0; i < ids.length; i++) if (ids[i][0] === id) return i + 2;
  return 0;
}

/** สร้างชีตพร้อมข้อมูลทุกเมนู — กด Run "setupNow" ครั้งเดียว */
function setupNow() { build_(SpreadsheetApp.openById(SHEET_ID)); }

function build_(ss) {
  var sh = ss.getSheetByName(MAIN);
  if (!sh) { sh = ss.getSheets()[0]; sh.setName(MAIN); }
  sh.clear(); sh.clearConditionalFormatRules();
  var n = ITEMS.length;
  sh.getRange(1, 1, 1, HEAD.length).setValues([HEAD])
    .setBackground('#000000').setFontColor('#C6A35A').setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle').setWrap(true);
  sh.setRowHeight(1, 46); sh.setFrozenRows(1); sh.setFrozenColumns(0);
  var data = ITEMS.map(function (r, i) {
    var row = i + 2;
    return ['=IMAGE("' + IMG_BASE + r[0] + '.jpg")', r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], '',
            '=IF(K' + row + '="","",H' + row + '/K' + row + ')',
            '=IF(K' + row + '="","",K' + row + '-H' + row + ')',
            '=IF(K' + row + '="","ยังไม่เคาะ","เคาะแล้ว")', '', ''];
  });
  sh.getRange(2, 1, n, HEAD.length).setValues(data);
  sh.setRowHeights(2, n, 96);
  var w = [110, 50, 50, 50, 180, 210, 170, 95, 80, 90, 100, 70, 90, 85, 130, 70];
  for (var i = 0; i < w.length; i++) sh.setColumnWidth(i + 1, w[i]);
  var body = sh.getRange(2, 1, n, HEAD.length);
  body.setVerticalAlignment('middle').setFontSize(11);
  sh.getRange(2, 2, n, 3).setHorizontalAlignment('center');
  sh.getRange(2, 5, n, 3).setWrap(true);
  sh.getRange(2, 5, n, 1).setFontWeight('bold');
  sh.getRange(2, 8, n, 1).setNumberFormat('#,##0.00');
  sh.getRange(2, 9, n, 3).setNumberFormat('#,##0');
  sh.getRange(2, 11, n, 1).setFontWeight('bold').setFontSize(14).setHorizontalAlignment('center').setBackground('#FFF8E6');
  sh.getRange(2, 12, n, 1).setNumberFormat('0.0%').setHorizontalAlignment('center');
  sh.getRange(2, 13, n, 1).setNumberFormat('#,##0.00');
  sh.getRange(2, 14, n, 1).setHorizontalAlignment('center');
  sh.getRange(2, 15, n, 1).setNumberFormat('d mmm yyyy HH:mm');
  sh.getRange(2, 16, n, 1).setNumberFormat('0%').setHorizontalAlignment('center');
  body.setBorder(true, true, true, true, false, true, '#E6E0D2', SpreadsheetApp.BorderStyle.SOLID);
  for (var r = 0; r < n; r++) if (ITEMS[r][1] === 'จาน') { sh.getRange(r + 2, 2, 1, 3).setBackground('#F4F1EA'); }
  var fc = sh.getRange(2, 12, n, 1), st = sh.getRange(2, 14, n, 1), nw = sh.getRange(2, 4, n, 1);
  var tgt = 'IF($P2="",0.35,$P2)';
  sh.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=AND($K2<>"",$L2>' + tgt + '+0.05)').setBackground('#F8D7D5').setFontColor('#B3261E').setBold(true).setRanges([fc]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=AND($K2<>"",$L2>' + tgt + ')').setBackground('#FDF0D5').setFontColor('#8A5A00').setBold(true).setRanges([fc]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=AND($K2<>"",$L2<=' + tgt + ')').setBackground('#DDF2E3').setFontColor('#1E6B3A').setBold(true).setRanges([fc]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('เคาะแล้ว').setBackground('#D42027').setFontColor('#FFFFFF').setBold(true).setRanges([st]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('ใหม่').setFontColor('#D42027').setBold(true).setRanges([nw]).build()
  ]);
  var lg = ss.getSheetByName(LOG) || ss.insertSheet(LOG);
  if (lg.getLastRow() === 0) {
    lg.getRange(1, 1, 1, 6).setValues([['เวลา', 'การกระทำ', 'รหัส', 'ชื่อไทย', 'ราคา (฿)', 'Fc%']])
      .setBackground('#000000').setFontColor('#C6A35A').setFontWeight('bold');
    lg.setFrozenRows(1);
    lg.getRange('A2:A').setNumberFormat('d mmm yyyy HH:mm:ss');
    lg.setColumnWidth(1, 170); lg.setColumnWidth(2, 120); lg.setColumnWidth(4, 220);
  }
  return sh;
}
