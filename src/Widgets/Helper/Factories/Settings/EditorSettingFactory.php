<?php


namespace Ceres\Widgets\Helper\Factories\Settings;


class EditorSettingFactory extends GenericSettingFactory
{
    /**
     * @param string $placeholder
     * @return BaseSettingFactory|EditorSettingFactory
     */
    public function withPlaceHolder($placeholder)
    {
        return $this->withOption('placeholder', $placeholder);
    }

    /**
     * @param string $fixedHeight
     * @return BaseSettingFactory|EditorSettingFactory
     */
    public function withFixedHeight($fixedHeight)
    {
        return $this->withOption('fixedHeight', $fixedHeight);
    }

    /**
     * @param string $minHeight
     * @return BaseSettingFactory|EditorSettingFactory
     */
    public function withMinHeight($minHeight)
    {
        return $this->withOption('minHeight', $minHeight);
    }
}