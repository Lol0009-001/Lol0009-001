# MVP Spec

## 目標
建立一個可以示範完整主流程的原型：

> 偵測位置 -> 區域觸發 -> 詢問目的地 -> 查詢巴士方案 -> 顯示提醒

## MVP 功能範圍

### 1. 位置偵測
- 可取得目前位置
- 可模擬位置變化（方便開發與測試）

### 2. 地理圍欄觸發
- 預設 2–5 個 geofence 區域
- 進入區域時彈出通知或對話框

### 3. 目的地輸入
支援：
- 快捷按鈕（Home / School / Walmart / Custom）
- 自由文字輸入

### 4. AI 理解（簡化版）
可理解：
- 返屋企
- 去學校
- 去 Walmart
- 去 downtown

可先以規則 + 映射表實現，之後再換成 LLM。

### 5. 巴士方案查詢
首版可先使用 mock data 或本地 JSON：
- 附近站點
- 下一班車時間
- 路線名稱
- 預計總行程時間
- 是否需要轉車

### 6. 提醒
- 建議幾時開始步行去站
- 巴士快到提醒
- 接近下車站提醒（可先模擬）

## UI 畫面

### Screen 1: Home
- 顯示目前位置狀態
- 顯示是否進入某 geofence
- 顯示最近一次查詢結果

### Screen 2: Destination Prompt
- 問：你想去邊？
- 快捷目的地按鈕
- 自訂輸入欄

### Screen 3: Route Result
- 最近上車站
- 下一班巴士時間
- 路線名稱
- 預計到達時間
- 提醒時間

### Screen 4: Saved Places
- Home
- School
- Work
- Favorites

## 資料模型

### SavedPlace
```json
{
  "id": "home",
  "name": "Home",
  "lat": 45.0,
  "lng": -66.0,
  "aliases": ["返屋企", "home"]
}
```

### GeoZone
```json
{
  "id": "school_zone",
  "name": "UNB Campus",
  "lat": 45.27,
  "lng": -66.06,
  "radiusM": 200
}
```

### TransitOption
```json
{
  "stopName": "Main St Station",
  "route": "Route 1",
  "departureInMin": 6,
  "travelTimeMin": 18,
  "transfers": 0
}
```

## API 設計（建議）

### POST /intent/resolve
輸入：
```json
{
  "text": "返屋企"
}
```
輸出：
```json
{
  "intent": "transit_query",
  "destinationId": "home"
}
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
      "transfers": 0
    }
  ]
}
```

## 開發次序
1. 建 Flutter UI skeleton
2. 加入 geofence/mock location service
3. 加本地 mock transit data
4. 加簡單 intent parser
5. 接 FastAPI stub
6. 再換成真實 API

## 驗收標準
- 可在模擬 geofence 觸發後進入詢問流程
- 可輸入或選擇目的地
- 可顯示至少一個 mock 巴士方案
- 可展示至少一個提醒事件
