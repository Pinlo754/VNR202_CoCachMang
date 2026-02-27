'use client';

interface GameRulesProps {
  onClose: () => void;
}

export default function GameRules({ onClose }: GameRulesProps) {
  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-amber-900">
        <h2 className="text-3xl font-bold text-amber-900">Luật Chơi</h2>
        <button
          onClick={onClose}
          className="text-2xl font-bold text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6 text-sm text-gray-700">

        {/* Overview */}
        <section>
          <h3 className="text-lg font-bold text-amber-900 mb-2">Tổng Quan</h3>
          <p>
            Cờ Cách Mạng là trò chơi chiến lược 2 người chơi. 
            Mỗi người điều khiển 8 quân với cấp bậc khác nhau,
            từ Cấp 1 đến Cấp 8. Mục tiêu là chiếm căn cứ đối phương
            hoặc tiêu diệt toàn bộ quân của họ.
          </p>
        </section>

        {/* Board */}
        <section>
          <h3 className="text-lg font-bold text-amber-900 mb-2">Bàn Cờ</h3>
          <ul className="space-y-1 ml-4 list-disc">
            <li>Lưới 7×9</li>
            <li>
              <span className="font-semibold">Ô Tím:</span> Căn Cứ (đối thủ thắng nếu đưa quân vào đây)
            </li>
            <li>
              <span className="font-semibold">Ô Đỏ:</span> Bẫy (quân vào đây sẽ bị giảm cấp xuống 0)
            </li>
            <li>
              <span className="font-semibold">Ô Xanh:</span> Địa đạo (chỉ Dân quân và Liên lạc có thể vào - Chỉ Đặc nhiệm và Chỉ huy có thể nhảy qua (ngang hoặc dọc điều kiện không có Quân nhân chặn giữa Địa đạo))
            </li>
          </ul>
        </section>

        {/* Units */}
        <section>
          <h3 className="text-lg font-bold text-amber-900 mb-2">Các Loại Quân</h3>
          <div className="space-y-2 ml-4 text-xs">
            <div><span className="font-semibold">👑 Thủ Lĩnh (Cấp 8)</span> - Đơn vị mạnh nhất</div>
            <div><span className="font-semibold">🎖️ Chỉ Huy (Cấp 7)</span> - Có thể nhảy vượt địa đạo</div>
            <div><span className="font-semibold">🪖 Đặc Nhiệm (Cấp 6)</span> - Có thể nhảy vượt địa đạo</div>
            <div><span className="font-semibold">🎯 Chiến Binh (Cấp 5)</span></div>
            <div><span className="font-semibold">📡 Liên Lạc (Cấp 4)</span> - Có thể vào Địa đạo</div>
            <div><span className="font-semibold">👨‍🎓 Trinh Sát (Cấp 3)</span></div>
            <div><span className="font-semibold">👷 Hậu Cần (Cấp 2)</span></div>
            <div><span className="font-semibold">👣 Dân Quân (Cấp 1)</span> - Có thể vào Địa đạo, có thể bắt Thủ Lĩnh</div>
          </div>
        </section>

        {/* Gameplay */}
        <section>
          <h3 className="text-lg font-bold text-amber-900 mb-2">Cách Chơi</h3>
          <ol className="space-y-2 ml-4 list-decimal text-xs">
            <li>Người chơi Phe Đỏ đi trước</li>
            <li>Mỗi lượt chọn một quân và di chuyển 1 ô (lên, xuống, trái, phải)</li>
            <li>Không được di chuyển chéo</li>
            <li>Di chuyển vào ô có quân đối phương để bắt nếu đủ cấp</li>
          </ol>
        </section>

        {/* Capture Rules */}
        <section>
          <h3 className="text-lg font-bold text-amber-900 mb-2">Luật Bắt Quân</h3>
          <ul className="space-y-1 ml-4 list-disc text-xs">
            <li>Quân cấp cao bắt được quân cấp thấp hoặc bằng</li>
            <li>
              <span className="font-semibold">Đặt biệt Quân nhân(Cấp 1):</span> Có thể bắt Thủ Lĩnh (Cấp 8)
            </li>
            <li>Quân bị vào Bẫy sẽ bị ép về cấp 0 và có thể bị bất kỳ quân nào bắt</li>
            <li>Rời khỏi Bẫy sẽ hồi phục cấp ban đầu</li>
          </ul>
        </section>

        {/* Special Mechanics */}
        <section>
          <h3 className="text-lg font-bold text-amber-900 mb-2">Cơ Chế Đặc Biệt</h3>
          <ul className="space-y-1 ml-4 list-disc text-xs">
            <li>
              <span className="font-semibold">Địa đạo:</span> Chỉ Quân nhân và Liên lạc có thể vào
            </li>
            <li>
              <span className="font-semibold">Bẫy:</span> Làm giảm cấp quân xuống 0
            </li>
            <li>
              <span className="font-semibold">Nhảy Vượt Địa Đạo:</span> Chỉ huy và Đặc nhiệm có thể nhảy qua địa đạo ngang hoặc dọc.
              Nếu có Quân nhân đứng giữa chặn ở đường nhảy, động tác sẽ bị chặn.
            </li>
            <li>
              <span className="font-semibold">Không vào Căn Cứ của mình:</span> Không thể di chuyển quân vào căn cứ của phe mình
            </li>
          </ul>
        </section>

        {/* Winning */}
        <section>
          <h3 className="text-lg font-bold text-amber-900 mb-2">Điều Kiện Thắng</h3>
          <ol className="space-y-1 ml-4 list-decimal text-xs">
            <li>Đưa bất kỳ quân nào vào Căn Cứ đối phương</li>
            <li>Bắt hết toàn bộ quân đối phương</li>
          </ol>
        </section>

        {/* Strategy Tips */}
        <section>
          <h3 className="text-lg font-bold text-amber-900 mb-2">Mẹo Chiến Lược</h3>
          <ul className="space-y-1 ml-4 list-disc text-xs">
            <li>Sử dụng Địa đạo để ẩn quân chiến lược</li>
            <li>Bảo vệ Thủ Lĩnh của bạn</li>
            <li>Dụ đối phương vào Bẫy</li>
            <li>Kiểm soát trung tâm bàn cờ</li>
            <li>Dùng Quân nhân để chặn Nhảy Vượt Địa Đạo</li>
            <li>Tận dụng Nhảy Vượt Địa Đạo để tấn công bất ngờ</li>
          </ul>
        </section>

      </div>
    </div>
  );
}