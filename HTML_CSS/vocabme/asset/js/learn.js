$(function () {

  learningCheckBtn();
  learningViewportSlideBox();
  inputGuessWord();

  learningWords();
  updateLearningVocabProgress(
    $(".learning-word-layer").length,
    0,
    $(".learning-word-progress-range span"),
    $(".learning-word-progress-title strong")
  );
});



// Learning page------------------------------------------------------------------------------------------------

function learningCheckBtn() {
  const $inputArea = $(".learning-word-fill");

  $inputArea.each(function (index, area) {
    const $input = $(area).find("input");
    const $btn = $(area).find("button");
    $input.on("input", function () {
      $(area).find("input.show-answer-right").removeClass("show-answer-right");
      $(area).find("input.show-answer-wrong").removeClass("show-answer-wrong");
      if ($(this).val() != "") {
        $btn.addClass("btn-active");
      } else {
        $btn.removeClass("btn-active");
      }
    });
  });
}

function learningViewportSlideBox() {
  const $card = $(".learning-word-viewport-container");
  $card.each(function (index, card) {
    const $btn = $(card).find(".card-turn");
    let pos = 0;
    $btn.on("click", function () {
      pos -= 120;
      $(card).css({
        transform: `rotateX(${pos}deg)`,
      });
    });
  });
}

function inputGuessWord() {
  const $learningLayer = $(".learning-word-layer");
  const soundRight = document.querySelector(".sound-answer-right");
  const soundWrong = document.querySelector(".sound-answer-wrong");

  $learningLayer.each(function (index, layer) {
    let word = $(layer).attr("words");
    const $input = $(layer).find(".learning-word-fill input");
    const $checkBtn = $(layer).find(".learning-word-fill button");
    $checkBtn.on("click", function () {
      if ($input.val() !== "") {
        if ($input.val().toLowerCase().trim() == word) {
          soundRight.play();
          $input.addClass("show-answer-right");
        } else {
          soundWrong.play();
          $input.addClass("show-answer-wrong");
        }
        $checkBtn.removeClass("btn-active");
      }
    });
  });
}

function learningWords() {
  const $cards = $(".learning-word-layer");
  const n = $cards.length;
  $(".learning-word-progress-title span").text(`${n}`);

  let index = 0;
  setCurrentLearningCart($cards.eq(0));

  const $btnNext = $(".learning-word-bottom-btn.btn-next");
  $btnNext.on("click", function () {
    $cards.each(function (index, card) {
      $(card).removeClass("left");
      $(card).addClass("right");
    });
    if (index < n - 1) {
      $(".learning-word-layer.hide").removeClass("hide");

      $cards.eq(index).addClass("hide");
      $cards.eq(index).removeClass("show");
      $cards.eq(index).removeClass("layer-current");
      index++;
      updateLearningVocabProgress(
        n,
        index,
        $(".learning-word-progress-range span"),
        $(".learning-word-progress-title strong")
      );

      setCurrentLearningCart($cards.eq(index));
    }
  });

  const $btnBack = $(".learning-word-bottom-btn.btn-back");
  $btnBack.on("click", function () {
    $cards.each(function (index, card) {
      $(card).removeClass("right");
      $(card).addClass("left");
    });
    if (index > 0) {
      $(".learning-word-layer.hide").removeClass("hide");
      $cards.eq(index).removeClass("show");
      $cards.eq(index).removeClass("layer-current");
      $cards.eq(index).addClass("hide");
      index--;
      setCurrentLearningCart($cards.eq(index));
      updateLearningVocabProgress(
        n,
        index,
        $(".learning-word-progress-range span"),
        $(".learning-word-progress-title strong")
      );
    }
  });
}

function setCurrentLearningCart($card) {
  $card.addClass("show");
  $card.addClass("layer-current");
  // $card.find(".filter-word-item-sound audio").get(0).play();
}

function updateLearningVocabProgress(
  totalLength,
  curIndex,
  $progressValue,
  $progressValueText
) {
  $progressValue.css({
    width: ((curIndex + 1) / totalLength) * 100 + "%",
  });
  $progressValueText.text(curIndex + 1);
}
