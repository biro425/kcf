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
        
    finally:
        if image:
            image.close()
            image = None
            print("[보안 처리 완료] 캡처된 이미지 데이터 메모리 참조 제거.")


def main():
    if not os.getenv("GEMINI_API_KEY"):
        print("오류: api 키 환경 변수가 설정되지 않았습니다. API 키를 설정해 주세요.")
        return

    try:
        client = genai.Client()
    except Exception:
        print("오류: Gemini 클라이언트 초기화에 실패했습니다. API 키를 다시 확인하세요.")
        return


    analysis_prompt = (
        "당신은 감정 분석 전문가입니다. 제공된 애플리케이션 화면 이미지를 분석하여, 사용자가 이 화면을 보거나 상호작용할 때 느낄 가장 지배적인 감정을 '긍정적', '부정적', '중립적' 중 하나로 분류하고, 그 이유를 텍스트 및 시각적 요소(색상, 레이아웃 등)를 기반으로 설명해 주세요."
    )

    print("--- 애플리케이션 화면 분석 AI 시작 ---")
    print("경고: 민감한 정보(비밀번호, 개인 정보 등)가 화면에 노출되지 않도록 주의하십시오.")
    print(f"분석 간격: {ANALYSIS_INTERVAL}초 | 모델: {GEMINI_MODEL}")
    
    while True:
        screen_image = None
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
            print("\n--- 사용자 요청으로 AI 분석을 종료합니다. ---")
            break
        except Exception as e:
            print(f"[주요 오류] 예기치 못한 에러 발생: {e}")
            
            if screen_image:
                screen_image.close()
                screen_image = None
                
            time.sleep(ANALYSIS_INTERVAL)

if __name__ == "__main__":
    main()