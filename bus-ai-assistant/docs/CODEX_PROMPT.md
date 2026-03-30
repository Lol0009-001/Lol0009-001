# Codex Prompt

請幫我建立一個 **Bus AI Assistant** 的最小可行原型（MVP）。

## 產品目標
這是一個結合 GPS 定位、geofencing、簡單 AI 對話、以及巴士班次查詢的個人交通助手。

使用流程：
1. 偵測使用者位置
2. 當使用者進入某個預設區域時觸發提示
3. 問使用者想去邊
4. 讓使用者可透過快捷按鈕或文字輸入目的地
5. 根據 mock transit data 顯示最近可用巴士方案
6. 顯示提醒資訊，例如：幾時開始步行去站、巴士幾分鐘後到

## 技術要求
- 前端請用 Flutter
- 後端請用 FastAPI（先做 stub/mock 即可）
- 不需要先接真實交通 API
- 請使用本地 mock JSON 來模擬：
  - saved places
  - geofences
  - transit options

## Flutter 端需要的畫面
1. Home Screen
   - 顯示目前位置狀態
   - 顯示目前是否在 geofence 內
   - 有一個按鈕可以模擬進入 geofence

2. Destination Prompt Screen / Modal
   - 問：你想去邊？
   - 快捷按鈕：Home / School / Walmart / Custom
   - 自訂文字輸入欄

3. Route Result Screen
   - 顯示：
     - 最近上車站
     - 路線名稱
     - 下一班車幾分鐘後到
     - 預計總行程時間
     - 是否轉車
     - 建議何時開始步行

4. Saved Places Screen
   - 顯示預設地點列表

## 後端 API
請建立以下 FastAPI endpoints：

### POST /intent/resolve
輸入：
```json
{ "text": "返屋企" }
```
輸出：
```json
{ "intent": "transit_query", "destinationId": "home" }
```

### POST /transit/search
輸入：
```json
{
  "origin": {"lat": 45.0, "lng": -66.0},
  "destinationId": "home"
}
```
輸出：
```json
{
  "options": [
    {
      "stopName": "Main St Station",
      "route": "Route 1",
      "departureInMin": 6,
      "travelTimeMin": 18,
      "transfers": 0,
      "walkToStopMin": 4
    }
  ]
}
```

## 資料要求
請建立 mock data 檔案，例如：
- `saved_places.json`
- `geofences.json`
- `transit_options.json`

## 架構要求
請建立清楚的資料夾結構，例如：
- `/app` Flutter app
- `/server` FastAPI backend
- `/docs` docs

## 額外要求
- 先讓專案可以本地跑起來
- 請補一份 README，說明如何安裝與啟動
- 先不要加入過於複雜的第三方 SDK
- geofence 可先用模擬按鈕代替真實背景定位
- intent resolve 可先用簡單 mapping/rules 實作，不用先接 LLM

## 開發目標
請先交付一個可演示的 prototype，而不是完整產品。
重點是把主流程做出來：
**simulate location/geofence -> ask destination -> show bus option -> show reminder**
