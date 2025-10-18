import os
import time
import mss
from PIL import Image
from google import genai
from google.genai.errors import APIError


ANALYSIS_INTERVAL = 5
GEMINI_MODEL = 'gemini-2.5-flash'

CAPTURE_MONITOR = None 


def capture_screen(monitor_area: dict = None) -> Image:
    with mss.mss() as sct:
        if monitor_area:
            sct_img = sct.grab(monitor_area)
        else:
            sct_img = sct.grab(sct.monitors[1]) 
        
        img = Image.frombytes("RGB", sct_img.size, sct_img.rgb, "raw", "RGB")
        return img

def analyze_image_with_gemini(client: genai.Client, image: Image, prompt: str):
    print(f"\n[Gemini API 호출] 분석 요청...")
    
    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=[prompt, image]
        )

        
    except APIError as e:
        print(f"[오류] Gemini API 호출 중 오류 발생: {e}")
    except Exception as e:
        print(f"[오류] 예상치 못한 오류 발생: {e}")

# --- 메인 실행 루프 ---
def main():
    if not os.getenv("GEMINI_KEY"):
        print("오류: GEMINI_API_KEY 환경 변수가 설정되지 않았습니다. API 키를 설정해 주세요.")
        return

    try:
        client = genai.Client()
    except Exception:
        print("오류: Gemini 클라이언트 초기화에 실패했습니다. API 키를 다시 확인하세요.")
        return

    # 모델에 전달할 구체적인 분석 프롬프트
    analysis_prompt = (
        "당신은 감정 분석에 탁월한 AI입니다. "
        "현재 캡처된 애플리케이션 화면의 UI를 분석해 주세요. "
        "화면의 현재 텍스트들을 가져와 분석해주세요 "
        "분석한 결과를 통해 사용자의 현재 상태 및 감정을 분석하여 텍스트 형태로 요약해줘"
    )

    print("--- 애플리케이션 화면 분석 AI ---")
    print(f"분석 간격: {ANALYSIS_INTERVAL}초 | 모델: {GEMINI_MODEL}")
    
    while True:
        try:
            start_time = time.time()
            screen_image = capture_screen(CAPTURE_MONITOR)
            capture_duration = time.time() - start_time
            print(f"\n[화면 캡처 완료] 소요 시간: {capture_duration:.2f}초")

            analyze_image_with_gemini(client, screen_image, analysis_prompt)
            
            elapsed_time = time.time() - start_time
            sleep_time = ANALYSIS_INTERVAL - elapsed_time
            
            if sleep_time > 0:
                print(f"다음 분석까지 {sleep_time:.2f}초 대기...")
                time.sleep(sleep_time)
            else:
                print("경고: 분석 시간이 설정 간격보다 길어 즉시 다음 루프를 시작합니다.")

        except KeyboardInterrupt:
            print("\n---  사용자 요청으로 AI 분석을 종료합니다. ---")
            break
        except Exception as e:
            print(f"[주요 오류] 예기치 못한 에러 발생: {e}")
            time.sleep(ANALYSIS_INTERVAL) 

if __name__ == "__main__":
    main()