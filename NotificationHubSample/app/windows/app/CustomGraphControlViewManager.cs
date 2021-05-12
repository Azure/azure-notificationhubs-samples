using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Windows.UI.Xaml;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Controls;

using Microsoft.ReactNative.Managed;
using System.Diagnostics;
using System.Collections.ObjectModel;
using Newtonsoft.Json.Linq;

namespace app
{
    internal class CustomGraphControlViewManager : AttributedViewManager<CustomGraphControl>
    {
        public override FrameworkElement CreateView()
        {
            var view = new CustomGraphControl();
            view.RegisterPropertyChangedCallback(CustomGraphControl.LabelProperty, (obj, prop) =>
            {
                if (obj is CustomGraphControl c)
                {
                    LabelChanged?.Invoke(c, c.Label);
                }
            });

            return view;
        }

        [ViewManagerProperty("label")]
        public void SetLabel(CustomGraphControl view, string value)
        {
            if (null != value)
            {
                view.SetValue(CustomGraphControl.LabelProperty, value);
            }
            else
            {
                view.ClearValue(CustomGraphControl.LabelProperty);
            }
        }

        [ViewManagerProperty("data")]
        public void SetData(CustomGraphControl view, string value)
        {
            if (null != value)
            {
                view.SetValue(CustomGraphControl.DataProperty, "");
                view.DataSet.Clear();

                var dataArray = JArray.Parse(value);
                foreach (var item in dataArray)
                {
                    view.DataSet.Add(new DataItem() { Timestamp = item["timestamp"].ToString(), NotificationsSent = item["notificationsSent"].ToObject<int>() });
                }
            }
            else
            {
                view.ClearValue(CustomGraphControl.DataProperty);
            }
        }

        [ViewManagerProperty("color")]
        public void SetColor(CustomGraphControl view, Brush value)
        {
            if (null != value)
            {
                view.SetValue(Control.ForegroundProperty, value);
            }
            else
            {
                view.ClearValue(Control.ForegroundProperty);
            }
        }

        [ViewManagerProperty("backgroundColor")]
        public void SetBackgroundColor(CustomGraphControl view, Brush value)
        {
            if (null != value)
            {
                view.SetValue(Control.BackgroundProperty, value);
            }
            else
            {
                view.ClearValue(Control.BackgroundProperty);
            }
        }

        [ViewManagerCommand]
        public void CustomCommand(CustomGraphControl view, string arg)
        {
            Debug.WriteLine($"{Name}.{nameof(CustomCommand)}({view.Tag}, \"{arg}\")");
        }

        [ViewManagerExportedDirectEventTypeConstant]
        public ViewManagerEvent<CustomGraphControl, string> LabelChanged = null;
    }
}
